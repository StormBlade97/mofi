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

class UserStore
{
  @persist @observable id = "";
  @persist @observable code = "";
  hasBeenLoaded = false;

  async requestNewUserId() {
    if(store.id.length === 0 && store.code.length > 0 && store.hasBeenLoaded === true) {
      // request new ID once
      const user = await (await fetch(`/session/${store.code}/new-user`)).json();
    }
  }
  // TODO: avatar and name
  @persist @observable name = "Darth Vader";
  @computed get avatar_url () {
    return `https://api.adorable.io/avatars/154/${this.name}`;
  }

  @persist isValid = false;
}

const store = new UserStore();

autorun(() => {
  if(store.id.length > 0) {
    console.log("ID found", store.id)
  }
});

autorun(() => {
  if(store.code.length > 0 && store.id.length === 0) {
    store.requestNewUserId();
  }
});

autorun(async () => {
  if(store.code.length === 0)
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
