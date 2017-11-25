import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    id: Number
});

const Movie = mongoose.model('Movie', schema);

export default Movie;
