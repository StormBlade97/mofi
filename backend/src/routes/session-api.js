import bodyParser from 'koa-bodyparser'
// import { authenticate } from './your-auth-middleware'
import { createController } from 'awilix-koa' // or `awilix-router-core`
import { Mood, MovieMood, Movie, MovieSession } from '../models'
import codeGen from '../lib/session_code'

/**
 * Routes:

   Mobile:
    - GET /session/:code/new-user   ->  user_id   
    - GET /session/:code/next-movie   ->  Movie (only movie_id)
    - POST /session/:code/ratings (an array of movie objects, ids, ....)

   TV:
    - GET /session/new    ->    session's code (do not display code yet)
    - POST /session/:code/mood   ->   (should now display code on TV client)
    - GET /session/:code/recommendations -> [10 x AggregateMovieRating]
 */

 const setStatusSession = async (ctx, next) => {
    const code = ctx.params.code
    if(code && code !== '') {
        ctx.state.session = await MovieSession.findOne({ code })
    }
    await next()
 }

 let _nextMovie = async (ctx) => {
    const session = ctx.state.session
    const { user_id } = ctx.request.body   

    const lookedAt = session.movies_assigned.toObject().filter(m => m.user_id == user_id).map(m => m.movie_id);
    
    let movies = session.all_movies.toObject().filter(m => m.user_id === user_id)[0].movie_ids.filter(id => !lookedAt.includes(id));
    // console.log(movies)
    movies.sort((a, b) => {
        let countA = session.movie_freq.filter(m => m.movie_id === a)[0].count
        let countB = session.movie_freq.filter(m => m.movie_id === b)[0].count
        if(countA > countB) return -1;
        if(countA < countB) return 1;
        return 0;
    })
    console.log(movies)

    if(!movies[0]) { // no more movies in mood
        ctx.body = null
        return
    }
    let nextMovie = movies[0]

    session.movies_assigned.push({
        movie_id: nextMovie,
        user_id
    })
    await session.save()

    ctx.body = nextMovie
 }

 const API = () => ({

    /// ////////////
    // New Session
    /// ////////////

    getUserID: async (ctx) => {
        const session = ctx.state.session
        let userId = `user+${codeGen()}+${codeGen()}`
        session.user_ids.push(userId)
        await session.save()
        ctx.body = userId
    },

    createSession: async  (ctx) => {
        let session = new MovieSession({  })
        session.code = codeGen()
        await session.save()
        ctx.body = session.code
    },

    /// ////////////
    // Mobile
    /// ////////////

    nextMovie: async  (ctx) => {
        await _nextMovie(ctx)
    },

    addRating: async  (ctx) => {
        const session = ctx.state.session
        const { movie_id, user_id, rating } = ctx.request.body        

        let ratingObj = { 
            movie_id,
            user_id,
            rating
        }
        session.movie_ratings.push(ratingObj)
        await session.save()

        await _nextMovie(ctx)
    },

    /// ////////////
    // TV
    /// ////////////

    setMovies: async (ctx) => {
        const session = ctx.state.session
        let { user_id, movie_ids } = ctx.request.body

        if(!Array.isArray(movie_ids)) {
            movie_ids = [movie_ids]
        }

        movie_ids.forEach(id => { 
            let movieFreqObj = session.movie_freq.find(m => m.movie_id === id)
            if(movieFreqObj)
                movieFreqObj.count += 1;
            else
                session.movie_freq.push({ movie_id: id, count: 1 }) 
        })
        session.all_movies.push({ user_id, movie_ids })
        await session.save()

        console.log(session.toObject())

        ctx.body = "success"
    },

    getRecommendations: async (ctx) => {
        const session = ctx.state.session
        const ratings = session.movie_ratings
        
        let aggRatings = ratings
            .reduce((prev, curr) => { 
                if(!prev[curr.movie_id]) {
                    prev[curr.movie_id] = 0
                }

                let ratingVal;
                switch(curr.rating) {
                    case "dislike":
                        ratingVal = -1;
                        break;
                    case "like":
                        ratingVal = 1;
                        break;
                    case "superlike":
                        ratingVal = 2;
                        break;
                    default:
                        // throw "Invalid rating"
                        console.log("invalid rating")
                }

                prev[curr.movie_id] += ratingVal
                return prev
            }, {});

        let sortedAggRatings = Object.keys(aggRatings)
            .map(id => ({ id, rating: aggRatings[id] }) )
            .sort((a, b) => { // sort desc
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;
                return 0;
            })
            // .filter(movie => movie.rating > 0)            

        ctx.body = sortedAggRatings
    }
})

export default createController(API)
    .prefix('/session') 
    .before([bodyParser(), setStatusSession])
    .get('/new', 'createSession') 
    .get('/:code/new-user', 'getUserID') 
    .get('/:code/next-movie', 'nextMovie') 
    .post('/:code/ratings', 'addRating')
    .post('/:code/user-movies', 'setMovies')
    .get('/:code/recommendations', 'getRecommendations');
