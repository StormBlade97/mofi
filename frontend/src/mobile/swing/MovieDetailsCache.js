import {
  observable,
  action,
  runInAction,
  autorun,
  toJS,
  extendObservable,
  extendShallowObservable,
} from 'mobx';

import localForage from 'localforage';
import { create, persist } from 'mobx-persist'
import fetch from '../../fetch';

class MovieDetailsCache
{
  // stores movie details by id
  @persist('map')
  @observable movieDetails = new Map();

  @persist count = 0;

  @action
  async addNewMovieById(id) {
    if (this.movieDetails.has(id)) {
      return this.movieDetails.get(id);
    }
    const response = await (await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d1eccb9147207740db16be3e840643da`)).json();
    runInAction("updateMovieDetails", () => {
      this.movieDetails.set(id, response);
    });
    return response;
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false
})

// create the state
const store = new MovieDetailsCache()

export const hydratedStore = hydrate('movie-details-store', store);
hydratedStore.then(() => {
    console.log('movie details store loaded')
})

autorun(() => {
  console.log("movieDetailsLength", store.movieDetails.size);
})
export default store;