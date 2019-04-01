const Model = require('../models/userModel');
const UtilitiesModel = require('../models/utilities/utilitiesModel');
const passport = require('passport');

/**
 * Create
 */
exports.create = (req, res, next) => {
    try {
        if (req.body.data === undefined || !req.body.data) {
            res.json(false);
        } else {
            Model.modelGetByUsername(req.body.data.username)
                .then((result) => {
                    if (result == false) {
                        let data = {
                            email: req.body.data.email,
                            username: req.body.data.username,
                            password: Model.hashPassword(req.body.data.password),
                            created_at: UtilitiesModel.getDateTime(),
                        }

                        Model.modelCreate(data)
                            .then((result) => {
                                res.json(result);
                            }).catch((err) => {
                                res.json({
                                    status: 0,
                                    message: 'error'
                                });
                            });
                    } else {
                        res.json({
                            status: 1
                        });
                    }
                });
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Update
 */
exports.update = (req, res, next) => {
    try {
        if (req.body.id === undefined || !req.body.id || !req.body.data || req.body.data === undefined) {
            res.json(false);
        } else {
            Model.modelGetByUsername(req.body.data.username)
                .then((result) => {
                    if (result == false) {
                        let data = req.body.data;
                        data.updated_at = UtilitiesModel.getDateTime(),

                        Model.modelUpdate(req.body.id, data)
                            .then((result) => {
                                res.json(result);
                            })
                            .catch((err) => {
                                res.json({
                                    status: 0,
                                    message: 'error'
                                });
                            });
                    } else {
                        res.json({
                            status: 1
                        });
                    }
                });
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Delete
 */
exports.delete = (req, res, next) => {
    try {
        if (req.body.id === undefined || !req.body.id) {
            res.json(false);
        } else {
            Model.modelDelete(req.body.id)
                .then((result) => {
                    res.json(result);
                });
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * List
 */
exports.list = (req, res, next) => {
    try {
        Model.modelGetAllData()
            .then((results) => {
                res.json({
                    result: results.result,
                    totalCounts: results.count
                });
            })
            .catch((err) => {
                res.json({
                    status: 0,
                    message: 'error'
                });
            });
    } catch (err) {
        console.log(err);
    }
}

/**
 * Register
 */
exports.register = (req, res, next) => {
    try {
        if (req.body.data === undefined || !req.body.data) {
            res.json(false);
        } else {
            Model.modelGetByUsername(req.body.data.username)
                .then((result) => {
                    if (result == false) {
                        let data = {
                            email: req.body.data.email,
                            username: req.body.data.username,
                            password: Model.hashPassword(req.body.data.password),
                            created_at: UtilitiesModel.getDateTime(),
                        }

                        Model.modelCreate(data)
                            .then((result) => {
                                data.id = result.insertId;

                                res.json({ user: Model.toAuthJSON(data) });
                            }).catch((err) => {
                                res.json({
                                    status: 0,
                                    message: 'error'
                                });
                            });
                    } else {
                        res.json({
                            status: 1
                        });
                    }
                });
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Login
 */
exports.login = (req, res, next) => {
    try {
        if (req.body.data === undefined || !req.body.data) {
            res.json(false);
        } else {
            passport.authenticate('local', { session: false }, (err, user, info) => {
                if (err || !user) {
                    return res.status(400).json({
                        message: info.message,
                        user   : user
                    });
                }
                
                req.login(user, {session: false}, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    
                    const data = user;  
                    data.token = Model.generateJWT(user);
                    return res.json({ user: Model.toAuthJSON(data) });
                });
            })(req, res);
        }
    } catch (err) {
        console.log(err);
    }
}