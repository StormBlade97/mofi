import { Mood, MovieMood, Movie, MovieSession } from '../models'

const seedData = () => {
    MovieSession.remove({ })
        .then(() => {
            MovieSession.create({ code: "blue-dog" })
        })
}

export default seedData