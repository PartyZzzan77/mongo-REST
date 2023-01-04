const express = require('express');
const dotenv = require('dotenv').config();
const chalk = require('chalk');
const { connectToDB, getDB } = require('./db');
const { ObjectID } = require('bson');

const highlightedError = chalk.bgRed.white;
const highlightedSuccess = chalk.bgGreen.whiteBright;

const PORT = process.env.PORT;
let db;

const app = express();
app.use(express.json());

const handleError = (res, errMessage) => {
    res.status(500).json({ error: errMessage });
};

connectToDB((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err
                ? console.log(highlightedError(err.message))
                : console.log(highlightedSuccess(`Server started at ${PORT}`));
            db = getDB();
        });
    } else {
        console.log(highlightedError(`DB Connection error${err.message}`));
    }
});

app.get('/movies', (req, res) => {
    const movies = [];
    db.collection('movies')
        .find()
        .sort({ title: 1 })
        .forEach((cursor) => movies.push(cursor))
        .then(() => {
            res.status(200).json(movies);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});

app.get('/movies/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        db.collection('movies')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((doc) => {
                res.status(200).json(doc);
            })
            .catch(() => handleError(res, 'Something went wrong'));
    } else {
        res.status(500).json({ error: 'ID is not valid' });
    }
});

app.delete('/movies/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        db.collection('movies')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(() => handleError(res, 'Something went wrong'));
    } else {
        res.status(500).json({ error: 'ID is not valid' });
    }
});

app.post('/movies', (req, res) => {
    db.collection('movies')
        .insertOne(req.body)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(() => handleError(res, 'Something went wrong'));
});

app.patch('/movies/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        db.collection('movies')
            .updateOne({ _id: ObjectID(req.params.id) }, { $set: req.body })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(() => handleError(res, 'Something went wrong'));
    } else {
        res.status(500).json({ error: 'ID is not valid' });
    }
});
