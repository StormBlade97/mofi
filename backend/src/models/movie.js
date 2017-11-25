import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    id: String
});

const Movie = mongoose.model('Movie', schema);

export default Movie;
