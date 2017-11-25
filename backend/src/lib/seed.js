import { Mood, MovieMood, Movie, MovieSession } from '../models'
import top250 from './imdb_top250'

const seedData = () => {
    MovieSession.remove({ })
        .then(() => {
            MovieSession.create({ code: "blue-dog", movie_freq: [...top250].map((movie_id) => ({ movie_id: "tt" + movie_id, count: 0 })) })
                // .then(() => console.log("Loaded initial session 'blue-dog'"))
                // .catch((err) => console.log(err))
        })
}

export default seedData