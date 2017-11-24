import bodyParser from 'koa-bodyparser'
// import { authenticate } from './your-auth-middleware'
import { createController } from 'awilix-koa' // or `awilix-router-core`

/**
 * Routes:

   Mobile:
    - GET /session/:code/next-movie   ->  Movie (only movie_id)
    - POST /session/:code/ratings (an array of movie objects, ids, ....)

   TV:
    - GET /session/new    ->    session's code (do not display code yet)
    - POST /session/:code/mood   ->   (should now display code on TV client)
    - GET /session/:code/recommendations -> [10 x AggregateMovieRating]
 */

// console.log()            

 const API = () => ({
//   constructor ({ userService }) {
//     this.userService = userService
//   }

    ///////////////
    // New Session
    ///////////////

    createSession: async  (ctx) => {
        ctx.body = 'alpha-monkey'
        // new session in DB
    },

    ///////////////
    // Mobile
    ///////////////

    nextMovie: async  (ctx) => {
        ctx.body = { movie_id: 1 }
    },

    addRating: async  (ctx) => {
        ctx.body = "success"
    },

    ///////////////
    // TV
    ///////////////

    setMood: async (ctx) => {
        ctx.body = "success"
    },

    getRecommendations: async (ctx) => {
        ctx.body = []
    }
})

export default createController(API)
    .prefix('/session') 
    // .before([bodyParser()])
    .get('/new', 'createSession') 
    .get('/:code/next-movie', 'nextMovie') 
    .post('/:code/ratings', 'addRating')
    .post('/:code/mood', 'setMood')
    .get('/:code/recommendations', 'getRecommendations');
