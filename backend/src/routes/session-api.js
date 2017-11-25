import bodyParser from 'koa-bodyparser'
// import { authenticate } from './your-auth-middleware'
import { createController } from 'awilix-koa' // or `awilix-router-core`
import { MovieSession } from '../models'
import codeGen from '../lib/session_code'
import {
  sample
} from 'lodash';
import coolNames from '../lib/cool_names';
import top250 from '../lib/imdb_top250'

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

    // console.log(username)
    // let movies = session.all_movies.toObject().filter(m => m.username === username)[0].movie_ids.filter(id => !lookedAt.includes(id));
    let movies = session.movie_freq.toObject().filter(m => !lookedAt.includes(m.movie_id))
    // console.log(movies)
    movies.sort((a, b) => {
        let countA = a.count
        let countB = b.count
        if(countA > countB) return -1;
        if(countA < countB) return 1;
        return 0;
    })
    console.log(movies.slice(0, 10))

    if(!movies[0]) { // no more movies in mood
        ctx.body = null
        return
    }
    let nextMovie = movies[0].movie_id

    session.movies_assigned.push({
        movie_id: nextMovie,
        username
    })
    await session.save()

    ctx.body = nextMovie

    return nextMovie
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
        ctx.body = tempUser;
    },

    createSession: async  (ctx) => {
        let session = new MovieSession({  })
        session.code = codeGen()
        session.usernames = [];
        session.movie_freq = [...top250].map(movie_id => ({ movie_id: "tt" + movie_id, count: 0 }))
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
        // session.all_movies.push({ username, movie_ids })
        await session.save()

        console.log(session.toObject())

        let initialMovies = movie_ids.slice(0, 4)
        if(initialMovies.length === 0) {
            console.log("No initial movies set ...")
            initialMovies = [await _nextMovie(ctx), await _nextMovie(ctx), await _nextMovie(ctx), await _nextMovie(ctx)]
        } else {
            initialMovies.forEach((movie_id) => session.movies_assigned.push({ username, movie_id }))
            await session.save()
        }


        ctx.body = initialMovies
    },

    getRecommendations: async (ctx) => {
        const session = ctx.state.session
        const ratings = session.movie_ratings

        let aggRatings = ratings
            .reduce((prev, curr) => {
                if(!prev[curr.movie_id]) {
                    prev[curr.movie_id] = { value: 0, likes: 0, dislikes: 0, superlikes: 0 }
                }

                switch(curr.rating) {
                    case "dislike":
                        prev[curr.movie_id].dislikes += 1
                        prev[curr.movie_id].value += -1                        
                        break;
                    case "like":
                        prev[curr.movie_id].likes += 1
                        prev[curr.movie_id].value += 1        
                        break;
                    case "superlike":
                        prev[curr.movie_id].superlikes += 1
                        prev[curr.movie_id].value += 2        
                        break;
                    default:
                        // throw "Invalid rating"
                        console.log("invalid rating")
                }

                return prev
            }, {});

        let sortedAggRatings = Object.keys(aggRatings)
            .map(id => ({ 
                id, 
                rating: aggRatings[id].value, 
                likes: aggRatings[id].likes, 
                dislikes: aggRatings[id].dislikes, 
                superlikes: aggRatings[id].superlikes }) )
            .sort((a, b) => { // sort desc
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;
                return 0;
            })
            // .filter(movie => movie.rating > 0)

        const users = session.usernames.map(name => ({
            name,
            avatar_url: coolNames.find(user => name === user.name).avatar_url
        }))

        ctx.body = { users: users, ratings: sortedAggRatings }
    }
})

export default createController(API)
    .prefix('/session')
    .get('/new', 'createSession')
    .get('/:code/valid', 'checkSession', {
      before: [setStatusSession]
    })
    .get('/:code/new-user', 'getUserID', {
      before: [setStatusSession]
    })
    .get('/:code/next-movie', 'nextMovie', {
      before: [setStatusSession]
    })
    .post('/:code/ratings', 'addRating', {
      before: [setStatusSession]
    })
    .post('/:code/user-movies', 'setMovies', {
      before: [setStatusSession]
    })
    .get('/:code/recommendations', 'getRecommendations', {
      before: [setStatusSession]
    })
