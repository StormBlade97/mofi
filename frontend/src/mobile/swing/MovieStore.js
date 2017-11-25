import {
  observable,
  autorun,
  action,
  computed,
  intercept,
} from 'mobx';

import fetch from '../../fetch';


class MovieStore
{

  @observable sessionCode = "afancysessioncode";

  @observable movies = [
    {
      title: "Foo",
      src: "http://authors.appadvice.com/wp-content/appadvice-v2-media/2015/08/Popcorn-Movies_fc3538c493404ecf8c7071a2641b3626.jpg",
      description: "Foooooo"
    },
    {
      title: "Foo2",
      src: "http://www.destinflorida.com/wp-content/uploads/2015/01/santa-rosa-mall-theater.jpeg",
      description: "Foooooo"
    },
    {
      title: "Foo3",
      src: "https://www.welovesolo.com/wp-content/uploads/vector/07/Film-and-movie-4.jpg",
      description: "Foooooo"
    },
  ];

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
        id: "foo"
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
}

const store = new MovieStore()

autorun(() => {
  console.log("movies changed", store.movies.slice(), store.moviesReversed.slice());
})


export default store;
