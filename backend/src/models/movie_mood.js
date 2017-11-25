import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    movie_id: Number,
    mood_id: Number    
});

const MovieMood = mongoose.model('MovieMood', schema);

export default MovieMood;