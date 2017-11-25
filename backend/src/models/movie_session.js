import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    id: Number,
    usernames: [String],
    code: String,
    movie_freq: [{
        movie_id: String,
        count: Number
    }],
    // all_movies: [{
    //     username: String,
    //     movie_id: String
    // }],
    movies_assigned: [{
        username: String, 
        movie_id: String
    }],
    movie_ratings: [{
        movie_id: String,
        username: String,
        rating: {
            type: String,
            lowercase: true,
            enum: ["dislike", "like", "superlike"]
        }
    }]
});

const MovieSession = mongoose.model('MovieSession', schema);

export default MovieSession;
