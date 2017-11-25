import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    movie_id: Number,
    user_id: Number,
    rating: {
        type: String,
        lowercase: true,
        enum: ["dislike", "like", "superlike"]
    }
});

// const Rating = mongoose.model('Rating', schema);
const Rating = schema;

export default Rating;
