const Movies = require('../Models/Movie');

const handleError = (res, errMessage) => {
    res.status(500).json({ error: errMessage });
};

const getAllMovies = (req, res) => {
    Movies.find()
        .sort({ title: 1 })
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch(() => handleError(res, 'Something went wrong'));
};

const getMovieByID = (req, res) => {
    Movies.findById(req.params.id)
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch(() => handleError(res, 'Something went wrong'));
};

const deleteMovieByID = (req, res) => {
    Movies.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
};

const createMovie = (req, res) => {
    const newMovie = new Movies(req.body);
    newMovie
        .save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
};

const updateMovieByID = (req, res) => {
    Movies.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
};

module.exports = {
    getAllMovies,
    getMovieByID,
    deleteMovieByID,
    createMovie,
    updateMovieByID,
};
