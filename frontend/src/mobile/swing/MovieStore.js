import {
  observable,
  autorun,
  action,
  computed,
} from 'mobx';

import fetch from '../../fetch';
import MovieDetailsCache, {hydratedStore} from './MovieDetailsCache';
import UserStore from '../UserStore';
import Swing from 'react-swing';

// { let data = []; $('.list.detail .list_item .image > a > div').each(function() { data.push($(this).data('const')) }); console.log(JSON.stringify(data, null, 2)) }

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
        { label: "Horror", active: false, movies: [
          "tt5215952",
          "tt0289043",
          "tt1139797",
          "tt5700672",
          "tt1457767",
          "tt0134847",
          "tt1038988",
          "tt4263482",
          "tt0435625",
          "tt1588170",
          "tt3235888",
          "tt1591095",
          "tt1029234",
          "tt0884328",
          "tt1922777",
          "tt0266308",
          "tt0420251",
          "tt0387564",
          "tt0365376",
          "tt1020530",
          "tt4972582",
          "tt0395584",
          "tt0251736",
          "tt1740707",
          "tt0440803",
          "tt0464141",
        ] },
        { label: "Action", active: false, movies: [
          "tt0974015",
          "tt3501632",
          "tt5463162",
          "tt2239822",
          "tt2231461",
          "tt2527336",
          "tt4154756",
          "tt0451279",
          "tt2406566",
          "tt2250912",
          "tt3890160",
          "tt4649466",
          "tt1959563",
          "tt1648190",
          "tt3450958",
          "tt2975590",
          "tt1477834",
          "tt1825683",
          "tt1386697",
          "tt5013056",
          "tt2704998",
          "tt2274648",
          "tt4881806",
          "tt4348012",
          "tt1981128",
          "tt3371366",
          "tt3532216",
          "tt3758172",
          "tt1615160",
          "tt3896198",
          "tt4912910",
          "tt4116284",
          "tt1790809",
          "tt1431045",
          "tt3829266",
          "tt3778644",
          "tt0800369",
          "tt1981115",
          "tt1469304",
          "tt2283362",
          "tt0468569",
          "tt0770828",
          "tt2488496",
          "tt3748528",
          "tt4425200",
          "tt3315342",
          "tt5164214",
        ] },
        { label: "Comedy", active: false, movies: [
          "tt5657846",
          "tt5439796",
          "tt6359956",
          "tt2380307",
          "tt4925292",
          "tt3606752",
          "tt3521126",
          "tt4649466",
          "tt1959563",
          "tt5027774",
          "tt4587656",
          "tt3501632",
          "tt6018306",
          "tt4468740",
          "tt2704998",
          "tt4225622",
          "tt3532216",
          "tt3470600",
          "tt4116284",
          "tt1431045",
          "tt3564472",
          "tt1528854",
          "tt6225520",
          "tt4651520"
        ]},
        { label: "Drama", active: false, movies: [
          "tt3402236",
          "tt2543472",
          "tt1485796",
          "tt5478478",
          "tt1396484",
          "tt5439796",
          "tt5362988",
          "tt4925292",
          "tt5715874",
          "tt0071877",
          "tt3521126",
          "tt1758810",
          "tt3450958",
          "tt5027774",
          "tt3829920",
          "tt6018306",
          "tt6644200",
          "tt5013056",
          "tt2396589",
          "tt5580390",
          "tt5726616",
          "tt3532216",
          "tt3758172",
          "tt1615160",
          "tt0491175"
        ] },
        { label: "Sci-Fi", active: false, movies: [
          "tt0974015",
          "tt3501632",
          "tt5463162",
          "tt2239822",
          "tt2231461",
          "tt2527336",
          "tt1856101",
          "tt4154756",
          "tt0451279",
          "tt2250912",
          "tt1648190",
          "tt3450958",
          "tt2975590",
          "tt1477834",
          "tt1825683",
          "tt1386697",
          "tt2274648",
          "tt4881806",
          "tt1981128",
          "tt3371366",
          "tt3896198",
          "tt7312940",
          "tt1431045",
          "tt3829266",
          "tt3778644"
        ] },
        { label: "Romantic", active: false, movies: [
          "tt5580390",
          "tt5726616",
          "tt4477536",
          "tt2771200",
          "tt1431045",
          "tt3783958",
          "tt4465564",
          "tt5462602",
          "tt0120338",
          "tt0093779",
          "tt2322441",
          "tt2226597",
          "tt4550098",
          "tt0034583",
          "tt0491203",
          "tt0089469",
          "tt3640424",
          "tt1661199",
          "tt0169547",
          "tt0109830",
          "tt0314331",
          "tt5311514",
          "tt0319343",
          "tt2674426",
          "tt6265828"
        ] },
        { label: "Adventure", active: false, movies: [
          "tt5580390",
          "tt3606752",
          "tt2239822",
          "tt2231461",
          "tt0974015",
          "tt2527336",
          "tt5478478",
          "tt4154756",
          "tt0451279",
          "tt6359956",
          "tt2380307",
          "tt2250912",
          "tt3501632",
          "tt5463162",
          "tt4123430",
          "tt4649466",
          "tt1648190",
          "tt3450958",
          "tt2975590",
          "tt1477834",
          "tt4587656",
          "tt1825683",
          "tt4468740",
          "tt1386697",
          "tt2274648",
        ]},
      ]
    },
    mood: {
      name: "Mood",
      tags: [
        { label: "Superheroes", active: false, movies: [
          'tt0848228',
          'tt1431045',
          'tt1386697',
          'tt0372784',
          'tt2015381',
        ]},
        { label: "Christmas", active: false, movies: [
          'tt0099785',
          'tt0107688',
          'tt0314331',
          'tt0319343',
          'tt0170016',
        ] },
        { label: "80's", active: false, movies: [
          'tt0089218', // The Goonies
          'tt0083866', // E.T. the Extra-Terrestrial
          'tt0094721', // Beetlejuice
          'tt0088763',	
          'tt0081505',
        ]},
        { label: "War", active: false, movies: [
          'tt0120815',	
          'tt0093058',	
          'tt5013056',	
          'tt0277434',	
          'tt2179136',
        ] },
        { label: "Ghost", active: false, movies: [
          'tt0167404',
          'tt0230600',
          'tt0087332',
          'tt0084516',
          'tt1179904',
        ] },
        { label: "Travel", active: false, movies: [
          'tt0335266',	
          'tt0758758',	
          'tt0328589',	
          'tt0879870',	
          'tt0449059',
        ] },
      ]
    },
    group: {
      name: "Group type",
      tags: [
        { label: "Geek night", active: false, movies: [
          'tt0168122',	
          'tt0120737',	
          'tt2488496',	
          'tt0903624',	
          'tt1285016',
        ]},
        { label: "Girls' night", active: false, movies: [
          'tt2582846',	
          'tt1000774',	
          'tt0147800',	
          'tt0089208',	
          'tt0092890',
        ] },
        { label: "Boys' night", active: false, movies: [
          'tt0073195', // Jaws
          'tt3659388', // The Martian
          'tt4065552', // Tuntematon sotilas
          'tt0055809',	
          'tt0086250',
        ]},
        { label: "Family night", active: false, movies: [
          'tt3521164',	
          'tt0032138',	
          'tt0058331',	
          'tt0117008',	
          'tt2294629',
        ] },
        { label: "Nostalgic night", active: false, movies: [
          'tt0100405',	
          'tt0102057',	
          'tt0101862',	
          'tt0105417',	
          'tt0107290',
        ] },
        { label: "Couple night", active: false, movies: [
          'tt1714206',	
          'tt0386588',	
          'tt0075686',	
          'tt1091722',	
          'tt1859650',
        ] },
      ]
    },
    features: {
      name: "Features",
      tags: [
        { label: "Recently added", active: false, movies: [
          'tt2250912', // spiderman homecoming
          'tt3501632', // Thor ragnarok
          'tt1856101', // blade runner
          'tt0451279', // wonder woman      
        ]},
        { label: "Oscar winners", active: false, movies: [
          'tt3783958', // La La Land
          'tt2024544', // 12 Years a Slave
          'tt1204342', // The Muppets
          "tt1504320",
          "tt0887912",
          "tt1010048",
          "tt0477348",
          "tt0407887",
          "tt0375679",
          "tt0405159",
          "tt0167260",
          "tt0299658",
          "tt0268978",
          "tt0172495",
          "tt0169547",
          "tt0138097",
          "tt0120338",
          "tt0116209",
          "tt0112573",
          "tt0109830",
          "tt0108052",
          "tt0105695",
          "tt0102926",
          "tt0099348",
          "tt0097239",
          "tt0095953",
          "tt0093389",
          "tt0091763",
          "tt0089755",
          "tt0086879",
          "tt0086425",
          "tt0083987",
          "tt0082158",
          "tt0081283",
          "tt0079417",
          "tt0077416",
          "tt0075686",
          "tt0075148",
          "tt0073486",
          "tt0071562",
          "tt0070735",
          "tt0068646",
          "tt0067116",
          "tt0066206",
          "tt0064665",
          "tt0063385",
          "tt0061811",
          "tt0060665",
          "tt0059742",
          "tt0022958",
          "tt0021746",
        ]},
        { label: "Most popular", active: false, movies: [
          "tt5580390",
          "tt5726616",
          "tt4477536",
          "tt5657846",
          "tt5439796",
          "tt2250912",
          "tt3890160",
        ]},
        { label: "Critically acclaimed", active: false, movies: [
          "tt0299658",
          "tt0268978",
          "tt0172495",
          "tt0169547",
          "tt0138097",
          "tt0120338",
          "tt0057590",
          "tt0056172",
          "tt0055614",
          "tt0053604",
          "tt0052618",
          "tt0051658",
          "tt0050212",
        ]},
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

  @action
  setMovies(ids) {
    this.movies = ids.map(id => ({
      id: id,
      details: {},
      inDetail: false,
    }));
  }

  addMovie(id) {
    this.movies.push({
      id: id,
      details: {},
      inDetail: false,
    });
  }

  constructor() {
    this.setMovies(movieDefaultIds);
    //hydratedStore.then(() => {
    //});
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
    this.setMovies(newQueue);
    return true;
  }

  @action
  async addRating(movie, direction) {
    console.log("Adding rating for movie", movie, direction);
    let type = "like";
    if (direction === Swing.DIRECTION.LEFT) {
      type = "dislike";
    }
    const newQueue = await (await fetch(`/session/${UserStore.code}/ratings`, {
      method: 'post',
      body: JSON.stringify({
        movie_id: this.movies[0].id,
        username: UserStore.name,
        rating: type,
      })
    })).text();
    this.addMovie(newQueue);
    console.log("New Queue", newQueue);
  }

  @action
  removeTopMovie() {
    this.movies.shift();
  }
}

const store = new MovieStore()

autorun(() => {
  console.log("movies changed", store.moviesReversed.slice(), store.movies.length);
  // ensure our cache is hot
  store.movies.forEach(m => {
    MovieDetailsCache.addNewMovieById(m.id);
  });
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
