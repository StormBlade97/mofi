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

const exists = (s) => (s && s.length === 0) || false;

class UserStore
{
  @persist @observable id = "";
  @persist @observable code = "";
  hasBeenLoaded = false;

  async requestNewUserId() {
    console.log("request2", store.id, store.code, store.hasBeenLoaded)
    if(!exists(store.id) && exists(store.code) && store.hasBeenLoaded === true) {
      // request new ID once
      try {
      const user = await (await fetch(`/session/${store.code}/new-user`)).json();
      runInAction(() => {
        this.id = user.id;
        console.log(user.name);
        this.name = user.name || "";
        // TODO: avatar
        //this.name = user.name;
      });
      } catch (e) {}
    }
  }
  setCode(code) {
    // reset user
    this.id = "";
    this.name = "";
    this.code = code;
  }
  // TODO: avatar and name
  @persist @observable name = "";
  @computed get avatar_url () {
    return `https://api.adorable.io/avatars/154/${this.name}`;
  }

  @persist isValid = false;
}

const store = new UserStore();

//autorun(() => {
  //if(exists(store.id)) {
    //console.log("ID found", store.id)
  //}
//});

autorun(() => {
  console.log("request", exist(store.code), exists(store.id))
  if(exists(store.code) && !exists(store.id)) {
    console.log("request", exists(store.id))
    store.requestNewUserId();
  }
});

autorun(async () => {
  if(!exists(store.code.length))
    return;

  let positiveResponse = false;
  try {
    const response = await (await fetch(`/session/${store.code}/valid`)).json();
    if (Object.keys(response) > 0){
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
