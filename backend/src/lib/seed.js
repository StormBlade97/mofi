import { Mood, MovieMood, Movie, MovieSession, Rating } from '../models'

const seedData = () => {
    Movie.remove({ })
        .then(() => {
            // Movie.create({ id:  })
        })
    MovieSession.remove({ })
        .then(() => {
            MovieSession.create({ code: "blue-dog" })
        })
    MovieMood.remove({ })
    Mood.remove({ })
        .then(() => {
            Mood.create({ id: 1, name: "Horror" })
        })
}

export default seedData