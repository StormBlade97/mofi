import {
  observable,
  autorun,
} from 'mobx';


class MovieStore
{

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
}

const store = new MovieStore()

autorun(() => {
  console.log("movies changed", store.movies.slice());
})


export default store;
