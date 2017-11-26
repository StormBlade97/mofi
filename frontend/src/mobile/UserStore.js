import {
  observable,
  action,
  runInAction,
  autorun,
  computed,
} from 'mobx';

import localForage from 'localforage';
import { create, persist } from 'mobx-persist'
import fetch from '../fetch';
import hydrate from './hydrate';

const exists = (s) => (s && s.length > 0) || false;

class UserStore
{
  @observable @persist name = "";
  @persist @observable code = "";
  @observable @persist avatar_url = "";
  @observable @persist session_id = "";

  @observable hasBeenLoaded = false;

  async getUserId() {
    if(exists(store.code) && store.hasBeenLoaded === true) {
      // request new ID once
      try {
        const obj = {
            username: this.name,
            avatar_url: this.avatar_url,
            session_id: this.session_id,
          }
        const user = await (await fetch(`/session/${store.code}/user`, {
          method: 'post',
          body: JSON.stringify(obj)
      })).json();
      runInAction(() => {
        //console.log("user", user);
        this.isValidUser = true;
        this.name = user.name;
        this.avatar_url = user.avatar_url;
        this.session_id = user.session_id;
      });
      } catch (e) {}
    }
  }
  setCode(code) {
    // reset user
    this.name = "";
    this.code = code;
    this.session_id = "";
  }

  //@computed get avatar_url () {
    //return `https://api.adorable.io/avatars/154/${this.name}`;
  //}

  @observable isValid = false;
  @observable isValidUser = false;
  @computed get isValidSession() {
    return this.isValid && exists(this.name) && exists(this.code);
  }

  async checkSession() {
    if(!exists(store.code))
      return;

    //console.log("check ...");
    let positiveResponse = false;
    try {
      const response = await (await fetch(`/session/${store.code}/valid`)).json();
      //console.log("checking session", response);
      if (Object.keys(response).length > 0 && "code" in response){
        runInAction(() => {
          store.isValid = true;
          store.isValidUser = false;
          positiveResponse = true;
        });
      }
    } catch (e) { }
    if (!positiveResponse) {
      runInAction(() => {
        store.isValid = false;
        store.isValidUser = false;
      });
    }
  }
}

const store = new UserStore();
export const hydratedStore = hydrate('user-id-store', store);

//autorun(() => {
  //if(exists(store.id)) {
    //console.log("ID found", store.id)
  //}
//});

export function initUserStore() {

// check session validity
autorun(async () => {
  if (exists(store.code)) {
    store.checkSession();
  }
});

// reload invalid user names
autorun(async () => {
  if (store.hasBeenLoaded && !store.isValidUser && store.isValid) {
    store.getUserId();
  }
});

hydratedStore.then(async () => {
  runInAction(() => {
    store.hasBeenLoaded = true;
  });
})
}

export default store;
