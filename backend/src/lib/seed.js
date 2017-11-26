import { Mood, MovieMood, Movie, MovieSession } from '../models'
import { digestTop250 } from './imdb_top250'

const seedData = () => {
    MovieSession.remove({ })
        .then(() => {
            MovieSession.create({ code: "blue-dog", movie_freq: digestTop250() })
                // .then(() => console.log("Loaded initial session 'blue-dog'"))
                // .catch((err) => console.log(err))
        })
}

export default seedData