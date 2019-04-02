const Server = require('./database/server');
const app = Server.app();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Routes path
const indexRoute = require('./routes/indexRoute');

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

// App Configuration
require('./config/passport.js');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for routes
app.use('/api', indexRoute);

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

// Error handlers & middlewares
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

module.exports = app;