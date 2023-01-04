const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();
const moviesRouter = require('./routes/movie_routes');

const highlightedError = chalk.bgRed.white;
const highlightedSuccess = chalk.bgGreen.whiteBright;

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(moviesRouter);

mongoose.set('strictQuery', false);
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
