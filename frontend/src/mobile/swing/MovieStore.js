import {
  observable,
  autorun,
  action,
  computed,
} from 'mobx';

import fetch from '../../fetch';
import MovieDetailsCache, {hydratedStore} from './MovieDetailsCache';

class MovieStore
{

  @observable sessionCode = "afancysessioncode";

  @observable movies = [
    {
      id: 'tt2250912', // spiderman homecoming
      details: {},
      title: "Foo",
      inDetail: false,
    },
    {
      id: 'tt3501632', // Thor ragnarok
      details: {},
      inDetail: false,
    },
    {
      id: 'tt1856101', // blade runner
      details: {},
      inDetail: false,
    },
    {
      id: 'tt0451279', // wonder woman
      details: {},
      inDetail: false,
    },
    {
      id: 'tt3450958', // war for the planet of the apes
      details: {},
      inDetail: false,
    },
    {
      id: 'tt3315342', // logan
      details: {},
      inDetail: false,
    },
    {
      id: 'tt3896198', // guardians of the galaxy
      details: {},
      inDetail: false,
    },
    {
      id: 'tt3371366', // transformers
      details: {},
      inDetail: false,
    },
  ];

  @observable tags = {
    mood: {
      name: "Mood",
      tags: [
        { label: "Horror", active: false },
        { label: "Action", active: false },
        { label: "Superheroes", active: false },
        { label: "Chrismas", active: false },
        { label: "Geek night", active: false },
        { label: "Girl night", active: false },
        { label: "Last added", active: false },
        { label: "Oscar winners", active: false },
        { label: "Thriller", active: false },
        { label: "Suspense", active: false},
        { label: "Romantic", active: false },
        { label: "LGBTQ", active: false },
        { label: "Kids", active: false },
      ]
    },
    atmosphere: {
      name: "Mood",
      tags: [
        { label: "Foo", active: false},
        { label: "Bar", active: false },
        { label: "Doo", active: false },
      ]
    },
    time: {
      name: "Mood",
      tags: [
        { label: "Foo", active: false},
        { label: "Bar", active: false },
        { label: "Doo", active: false },
      ]
    }
  }

  constructor() {
    hydratedStore.then(() => {
      this.movies.forEach(m => {
        MovieDetailsCache.addNewMovieById(m.id);
      });
    });
  }

  @computed get moviesReversed() {
    // only show three cards at max (performance)
    return this.movies.slice(0, 3).reverse();
  }

  async refreshMovies() {
    await fetch(`/session/${this.sessionCode}/queue`, {

    })
  }

  @action
  async addRating(movie, direction) {
    console.log("Adding rating for movie", movie, direction);
    const newQueue = await fetch(`/session/${this.sessionCode}/ratings`, {
      method: 'post',
      body: JSON.stringify({
        movie_id: "00",
        user_id: "00",
        rating: "like"
      })
    });
    const response = await newQueue.json();
    console.log("New Queue", response);
  }

  @action
  removeTopMovie() {
    this.movies.shift();
  }

  addMovie() {
    this.movies.unshift({
      title: "Foo222",
      src: "https://thenypost.files.wordpress.com/2014/11/movietheater131050-525x350.jpg?quality=90&strip=all&w=664&h=441&crop=1"
    });
  }

  async storeTags() {
    // 1) Send tags to server
    // 2) Receive initial movie queue
    return true;
  }
}

const store = new MovieStore()

autorun(() => {
  console.log("movies changed", store.moviesReversed.slice(), store.movies.length);
})

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


export default store;
