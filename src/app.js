const Server = require('./database/server');
const app = Server.app();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'secret', (err,decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Handler for routes
app.use('/api', indexRoute);

// Error handlers & middlewares
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

module.exports = app;