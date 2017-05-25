const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;

const app  = express();

// log to console
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
require('./config/routes').configure(app);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.end(err.message);
}

// START THE SERVER
// =============================================================================
app.listen(port, function () {
    console.log('App is listening on port ' + port);
});

module.exports = app;