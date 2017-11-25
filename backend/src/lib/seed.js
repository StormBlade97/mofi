import { Mood, MovieMood, Movie, MovieSession } from '../models'

const seedData = () => {
    MovieMood.remove({ })
        .then(() => {
            const actionMovies = [
                'tt2250912', // spiderman homecoming
                'tt3501632', // Thor ragnarok
                'tt1856101', // blade runner
                'tt3315342', // logan
                'tt3896198', // guardians of the galaxy
                'tt3371366', // transformers
            ]

            actionMovies.forEach((id) => {
                MovieMood.create({ movie_id: id, mood_id: 1 })
            })
        })
    Mood.remove({ })
        .then(() => {
            Mood.create({ id: 1, name: "Action" })
            Mood.create({ id: 2, name: "Horror" })
            Mood.create({ id: 3, name: "Sci-Fi" })
            Mood.create({ id: 4, name: "Christmas" })
            Mood.create({ id: 5, name: "Girl's Night" })
        })
    Movie.remove({ })
        .then(() => {
            const movieIds = [
                'tt2250912', // spiderman homecoming
                'tt3501632', // Thor ragnarok
                'tt1856101', // blade runner
                'tt0451279', // wonder woman
                'tt3450958', // war for the planet of the apes
                'tt3315342', // logan
                'tt3896198', // guardians of the galaxy
                'tt3371366', // transformers
            ]

            movieIds.forEach((id) => {
                Movie.create({ id })
            })
        })
    MovieSession.remove({ })
        .then(() => {
            MovieSession.create({ code: "blue-dog", mood_id: 1 })
        })
}

export default seedData