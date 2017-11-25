import mongoose, { Schema, SchemaTypes } from 'mongoose';
import Rating from './rating';

const schema = new Schema({
    id: Number,
    user_ids: [Number],
    code: String,
    mood_id: Number,
    movies_assigned: [{
        user_id: Number, 
        movie_id: Number
    }],
    movie_ratings: [Rating]
});

const MovieSession = mongoose.model('MovieSession', schema);

export default MovieSession;
