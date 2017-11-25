import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema({
    id: Number,
    name: String
});

const Mood = mongoose.model('Mood', schema);

export default Mood;
