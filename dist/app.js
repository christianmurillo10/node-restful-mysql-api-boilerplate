const Server = require('./database/server');
const app = Server.app();
const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStoreMySQL = new MySQLStore({}, db.get());

// Routes path
const indexRoute = require('./routes/indexRoute');

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

// App Configuration
require('./config/passport.js');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  store: sessionStoreMySQL,
  proxt: true,
  resave: true,
  saveUninitialized: true
}));

// Handler for routes
app.use('/api', indexRoute);

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

// Error handlers & middlewares
app.use((req, res, next) => {
    res.status(404).send('We this you are lost!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

app.listen(port, () => console.info(`Server has listening at ${port}`));