import {
  observable,
  autorun,
  action,
} from 'mobx';

import fetch from '../../fetch';


class MovieStore
{

  @observable sessionCode = "afancysessioncode";

  @observable movies = [
    {
      title: "Foo",
      src: "http://authors.appadvice.com/wp-content/appadvice-v2-media/2015/08/Popcorn-Movies_fc3538c493404ecf8c7071a2641b3626.jpg"
    },
    {
      title: "Foo2",
      src: "http://www.destinflorida.com/wp-content/uploads/2015/01/santa-rosa-mall-theater.jpeg"
    },
    {
      title: "Foo3",
      src: "https://www.welovesolo.com/wp-content/uploads/vector/07/Film-and-movie-4.jpg"
    },
  ];

  async refreshMovies() {
    await fetch(`/session/${this.sessionCode}/queue`, {

    })
  }

  async addRating(movie) {
    console.log("Adding rating for movie", movie);
    const newQueue = await fetch(`/session/${this.sessionCode}/ratings`, {
      method: 'post',
      body: JSON.stringify({
        id: "foo"
      })
    })
    console.log("New Queue", newQueue);
  }

  @action updateQueue(queue) {
    this.movies = queue;
  }
}

const store = new MovieStore()

autorun(() => {
  console.log("movies changed", store.movies.slice());
})


export default store;
