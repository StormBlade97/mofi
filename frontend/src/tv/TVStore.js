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

import MovieDetailsCache from '../mobile/swing/MovieDetailsCache';

class TVStore {

  @persist
  @observable code = "";
  @observable usernames = [];
  @observable movies = [];
  @observable isValid = false;

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
      if (body.message && body.message === "Invalid session" && store.code && store.code.length > 0) {
        store.code = "";
        return;
      }
      if (body && body.usernames) {
        this.usernames = body.usernames;
      }
      if (body && body.ratings) {
        this.setMovies(body.ratings);
      }
    }
  }
  @action
  async getCode() {
    const code = await (await fetch(`/session/new`)).text();
    runInAction(() => {
      this.code = code;
      this.isValid = true;
    });
    this.refresh();
  }

  startMonitor() {
    this.interval = setInterval(this.refresh.bind(this), 100);
  }
  stopMonitor() {
    clearInterval(this.interval);
  }
  @action
  setMovies(movies) {
    this.movies = movies.map(m => ({
      ...m,
      details: {},
    }));
  }
}

// create the state
const store = new TVStore()

export const hydratedStore = hydrate('tv-store', store);

export function initTV() {

hydratedStore.then(() => {
  if (!(store.code && store.code.length > 0)) {
    store.getCode();
  }
    //console.log('tv store loaded')
})

// request new code if empty
autorun(async () => {
  await hydratedStore;
  if (store.code && store.code.length === 0) {
    console.log("requesting new code");
    await store.getCode();
    console.log("requesting new code", store.code);
    store.refresh();
  }
});

autorun(() => {
  if (store.code && store.code.length > 0) {
    console.log("new code: ", store.code);
  }
})

// check code validity
autorun(async () => {
  if (!(store.code && store.code.length > 0))
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

autorun("addNewlyFoundDetails", () => {
    store.movies.forEach(m => {
      // TODO: don't overwrite if not new
      if(MovieDetailsCache.movieDetails.has(m.id)) {
        const details = MovieDetailsCache.movieDetails.get(m.id);
        details.poster_url = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
        m.details = details;
      }
    });
})

};

export default store;
