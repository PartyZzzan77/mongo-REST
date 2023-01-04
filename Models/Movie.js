const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genres: [String],
    rating: Number,
    duration: {
        hours: Number,
        minutes: Number,
    },
    reviews: [{ name: String, text: String }],
});

const Movies = mongoose.model('Movie', MovieSchema);

module.exports = Movies;
