const express = require('express');
const dotenv = require('dotenv').config();
const chalk = require('chalk');

const highlightedError = chalk.bgRed.white;
const highlightedSuccess = chalk.bgGreen.whiteBright;

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, (err) => {
    err
        ? console.log(highlightedError(err.message))
        : console.log(highlightedSuccess(`Server started at ${PORT}`));
});
