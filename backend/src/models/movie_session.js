import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    id: Number,
    user_ids: [String],
    code: String,
    mood_id: Number,
    movies_assigned: [{
        user_id: String, 
        movie_id: String
    }],
    movie_ratings: [{
        movie_id: String,
        user_id: String,
        rating: {
            type: String,
            lowercase: true,
            enum: ["dislike", "like", "superlike"]
        }
    }]
});

const MovieSession = mongoose.model('MovieSession', schema);

export default MovieSession;
