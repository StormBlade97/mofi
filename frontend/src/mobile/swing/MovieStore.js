import {
  observable,
  autorun,
  action,
  computed,
} from 'mobx';

import fetch from '../../fetch';
import MovieDetailsCache, {hydratedStore} from './MovieDetailsCache';
import UserStore from '../UserStore';

const movieDefaultIds = [
    'tt2250912', // spiderman homecoming
    'tt3501632', // Thor ragnarok
    'tt1856101', // blade runner
    'tt0451279', // wonder woman
    'tt3450958', // war for the planet of the apes
    'tt3315342', // logan
    'tt3896198', // guardians of the galaxy
    'tt3371366', // transformers
];

class MovieStore
{
  @observable movies = [];

  @observable tags = {
    category: {
      name: "Category",
      tags: [
        { label: "Horror", active: false },
        { label: "Action", active: false },
        { label: "Comedy", active: false },
        { label: "Drama", active: false },
        { label: "Sci-Fi", active: false },
        { label: "Romantic", active: false },
        { label: "Adventure", active: false },
      ]
    },
    mood: {
      name: "Mood",
      tags: [
        { label: "Superheroes", active: false},
        { label: "Christmas", active: false },
        { label: "80's", active: false, movies: [
          'tt0089218', // The Goonies
          'tt0083866', // E.T. the Extra-Terrestrial
          'tt0094721', // Beetlejuice
        ]},
        { label: "War", active: false },
        { label: "Ghost", active: false },
        { label: "Travel", active: false },
      ]
    },
    group: {
      name: "Group type",
      tags: [
        { label: "Geek night", active: false},
        { label: "Girls' night", active: false },
        { label: "Boys' night", active: false, movies: [
          'tt0073195', // Jaws
          'tt3659388', // The Martian
          'tt4065552', // Tuntematon sotilas
        ]},
        { label: "Family night", active: false },
        { label: "Nostalgic night", active: false },
        { label: "Couple night", active: false },
      ]
    },
    features: {
      name: "Features",
      tags: [
        { label: "Recently added", active: false},
        { label: "Oscar winners", active: false, movies: [
          'tt3783958', // La La Land
          'tt2024544', // 12 Years a Slave
          'tt1204342', // The Muppets
        ]},
        { label: "Most popular", active: false},
        { label: "Originals", active: false},
        { label: "Critically acclaimed", active: false},
      ]
    }
  }

  @computed get nrOfSelectedTags() {
    let count = 0;
    Object.keys(this.tags).forEach(tagline => {
      this.tags[tagline].tags.forEach(tag => {
        if (tag.active) {
          count++;
        }
      });
    });
    return count;
  }

  constructor() {
    this.movies = movieDefaultIds.map(id => ({
      id: id,
      details: {},
      inDetail: false,
    }));
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
    await fetch(`/session/${this.sessionCode}/user-movies`, {

    })
  }

  async primeMovieQueue() {
    let queue = movieDefaultIds.slice();
    Object.keys(this.tags).forEach(tagline => {
      this.tags[tagline].tags.forEach(tag => {
        if (tag.active && tag.movies !== undefined) {
          queue = tag.movies.slice().concat(queue);
        }
      });
    });
    const newQueue = await (await fetch(`/session/${UserStore.code}/user-movies`, {
      method: 'post',
      body: JSON.stringify({
        movie_ids: queue,
        username: UserStore.name,
      })
    })).json();
    console.log("New Queue", newQueue);
  }

  @action
  async addRating(movie, direction) {
    console.log("Adding rating for movie", movie, direction);
    const newQueue = await (await fetch(`/session/${UserStore.code}/ratings`, {
      method: 'post',
      body: JSON.stringify({
        movie_id: "000",
        username: UserStore.name,
        rating: "like"
      })
    })).json();
    console.log("New Queue", newQueue);
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
    // 1) Send movie ids to server
    // fall back to default ids (?)
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
