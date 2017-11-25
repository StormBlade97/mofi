import {
  observable,
  action,
  runInAction,
  autorun,
  computed,
} from 'mobx';

import { persist } from 'mobx-persist'
import fetch from '../fetch';
import hydrate from '../mobile/hydrate';

class TVStore {

  //@persist
  @observable code = "";
  @observable usernames = [];
  @observable ratings = [];

  @computed get hostURL() {
    return window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');
  }

  @computed get appURL() {
    return `${this.hostURL}/app`;
  }

  @computed get codeQRURL() {
    const url = `${this.hostURL}/app/c/${this.code}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${url}`;
  }

  constructor() {
    this.refresh();
  }
  async refresh() {
    if (this.code && this.code.length > 0) {
      const body = await (await fetch(`/session/${this.code}/recommendations`)).json();
      console.log(body);
      if (body && body.usernames) {
        this.usernames = body.usernames;
      }
      if (body && body.ratings) {
        this.ratings = body.ratings;
      }

    }
  }
  @action
  async getCode() {
    const code = await (await fetch(`/session/new`)).text();
    runInAction(() => {
      this.code = code;
    });
    this.refresh();
  }

  startMonitor() {
    this.interval = setInterval(this.refresh.bind(this), 100);
  }
  stopMonitor() {
    clearInterval(this.interval);
  }
}

// create the state
const store = new TVStore()

export const hydratedStore = hydrate('tv-store', store);
hydratedStore.then(() => {
  if (!(store.code && store.code.length > 0)) {
    store.getCode();
  }
    //console.log('movie details store loaded')
})

autorun(() => {
  if (store.code && store.code.length > 0) {
    console.log("new code: ", store.code);
  }
})
export default store;
