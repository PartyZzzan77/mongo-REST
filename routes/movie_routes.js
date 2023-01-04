const express = require('express');
const {
    getMovieByID,
    getAllMovies,
    deleteMovieByID,
    createMovie,
    updateMovieByID,
} = require('../controllers/movie_controller');

const router = express.Router();

router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieByID);
router.delete('/movies/:id', deleteMovieByID);
router.post('/movies', createMovie);
router.patch('/movies/:id', updateMovieByID);

module.exports = router;
