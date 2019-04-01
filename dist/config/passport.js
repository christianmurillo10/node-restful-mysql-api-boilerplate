const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'data[username]',
    passwordField: 'data[password]'
}, (username, password, done) => {
    userModel.modelGetByUsername(username)
        .then((result) => {
            if (result == false) {
                return done(null, false, { message: 'Unknown User' });
            }

            userModel.validatePassword(password, result.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                } else {
                    if (isMatch) {
                        return done(null, result);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                }
            });
        }).catch(done);
}));