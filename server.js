const express = require('express');
const dotenv = require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');
const Movies = require('./Models/Movie');

const highlightedError = chalk.bgRed.white;
const highlightedSuccess = chalk.bgGreen.whiteBright;

const PORT = process.env.PORT;

const handleError = (res, errMessage) => {
    res.status(500).json({ error: errMessage });
};

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(highlightedSuccess(`Connect to MongoDB`)))
    .catch((err) => {
        console.log(highlightedError(`DB Connection error${err.message}`));
    });

app.listen(PORT, (err) => {
    err
        ? console.log(err)
        : console.log(highlightedSuccess(`listening port ${PORT}`));
});

app.get('/movies', (req, res) => {
    Movies.find()
        .sort({ title: 1 })
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});

app.get('/movies/:id', (req, res) => {
    Movies.findById(req.params.id)
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});

app.delete('/movies/:id', (req, res) => {
    Movies.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});

app.post('/movies', (req, res) => {
    const newMovie = new Movies(req.body);
    newMovie
        .save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});

app.patch('/movies/:id', (req, res) => {
    Movies.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});
