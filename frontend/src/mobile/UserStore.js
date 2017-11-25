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
  @persist @observable name = "";
  @persist @observable code = "";
  hasBeenLoaded = false;

  async requestNewUserId() {
    if(!exists(store.name) && exists(store.code) && store.hasBeenLoaded === true) {
      // request new ID once
      try {
      const user = await (await fetch(`/session/${store.code}/new-user`)).json();
      runInAction(() => {
        console.log(user);
        this.name = user.name;
        this.avatar_url = user.avatar_url;
      });
      } catch (e) {}
    }
  }
  setCode(code) {
    // reset user
    this.name = "";
    this.code = code;
  }
  // TODO: avatar and name
  //@computed get avatar_url () {
    //return `https://api.adorable.io/avatars/154/${this.name}`;
  //}

  @persist @observable isValid = false;

  @computed get isValidSession() {
    return this.isValid && exists(this.name) && exists(this.code);
  }
}

const store = new UserStore();

//autorun(() => {
  //if(exists(store.id)) {
    //console.log("ID found", store.id)
  //}
//});

autorun(() => {
  if(exists(store.code) && !exists(store.id)) {
    store.requestNewUserId();
  }
});

autorun(async () => {
  if(!exists(store.code))
    return;

  let positiveResponse = false;
  try {
    const response = await (await fetch(`/session/${store.code}/valid`)).json();
    if (Object.keys(response).length > 0 && "code" in response){
      runInAction(() => {
        store.isValid = true;
        positiveResponse = true;
      });
    }
  } catch (e) { }
  if (!positiveResponse) {
    runInAction(() => {
      store.isValid = false;
    });
  }
});


export const hydratedStore = hydrate('user-id-store', store);
hydratedStore.then(async () => {
  store.requestNewUserId();
  store.hasBeenLoaded = true;
})

export default store;
