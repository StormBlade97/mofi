import bodyParser from 'koa-bodyparser'
// import { authenticate } from './your-auth-middleware'
import { createController } from 'awilix-koa' // or `awilix-router-core`
import { Mood, MovieMood, Movie, MovieSession } from '../models'
import codeGen from '../lib/session_code'
import {
  cloneDeep,
  sample,
} from 'lodash';
import coolNames from '../lib/cool_names';

/**
 * Routes:

   Mobile:
    - GET /session/:code/new-user   ->  username
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
    if (ctx.state.session) {
      await next();
    } else {
      ctx.throw(404, "Invalid session");
    }
 }

 let _nextMovie = async (ctx) => {
    const session = ctx.state.session
    const username = ctx.request.body.username || ctx.request.query.username

    const lookedAt = session.movies_assigned.toObject().filter(m => m.username === username).map(m => m.movie_id);

    console.log(username)
    let movies = session.all_movies.toObject().filter(m => m.username === username)[0].movie_ids.filter(id => !lookedAt.includes(id));
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
        username
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
        let tempUser;
        do {
          tempUser = sample(coolNames)
        } while(session.usernames.filter(u => u === tempUser.name).length > 0);
        // make a final copy and save
        const dbUser = tempUser.name
        session.usernames.push(dbUser)
        await session.save()
        ctx.body = tempUser
    },

    createSession: async  (ctx) => {
        let session = new MovieSession({  })
        session.code = codeGen()
        session.usernames = [];
        await session.save()
        ctx.body = session.code
    },

    checkSession: async  (ctx) => {
        const session = ctx.state.session
        ctx.body = session || {};
    },

    /// ////////////
    // Mobile
    /// ////////////

    nextMovie: async  (ctx) => {
        await _nextMovie(ctx)
    },

    addRating: async  (ctx) => {
        const session = ctx.state.session
        const { movie_id, username, rating } = ctx.request.body

        let ratingObj = {
            movie_id,
            username,
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
        let { username, movie_ids } = ctx.request.body

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
        session.all_movies.push({ username, movie_ids })
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
    .get('/new', 'createSession')
    .get('/:code/valid', 'checkSession', {
      before: [bodyParser(), setStatusSession]
    })
    .get('/:code/new-user', 'getUserID', {
      before: [bodyParser(), setStatusSession]
    })
    .get('/:code/next-movie', 'nextMovie', {
      before: [bodyParser(), setStatusSession]
    })
    .post('/:code/ratings', 'addRating', {
      before: [bodyParser(), setStatusSession]
    })
    .post('/:code/user-movies', 'setMovies', {
      before: [bodyParser(), setStatusSession]
    })
    .get('/:code/recommendations', 'getRecommendations', {
      before: [bodyParser(), setStatusSession]
    })
