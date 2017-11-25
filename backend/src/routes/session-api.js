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

 const API = () => ({
//   constructor ({ userService }) {
//     this.userService = userService
//   }

    /// ////////////
    // New Session
    /// ////////////

    getUserID: async (ctx) => {
        const session = ctx.state.session
        let userId = `user+${codeGen()}+${codeGen()}`
        session.user_ids += userId
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
        const session = ctx.state.session
        const mood_id = session.mood_id
        const user_id = ctx.request.body.user_id
        
        let movies = await MovieMood.find({ mood_id }).limit(5)
        let movie_id = movies[0].movie_id

        session.movies_assigned.push({
            movie_id,
            user_id
        })
        await session.save()

        ctx.body = movie_id
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

        ctx.body = session.movie_ratings.toObject()
    },

    /// ////////////
    // TV
    /// ////////////

    setMood: async (ctx) => {
        const session = ctx.state.session
        const moodId = ctx.request.body.mood_id
        session.mood_id = moodId
        await session.save()
        console.log(moodId)
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
    .post('/:code/mood', 'setMood')
    .get('/:code/recommendations', 'getRecommendations');
