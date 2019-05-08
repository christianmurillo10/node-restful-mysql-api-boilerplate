const Model = require('../models/permissionModel');
const UtilitiesModel = require('../models/utilities/utilitiesModel');

/**
 * Create
 */
exports.create = (req, res, next) => {
    try {
        if (req.body.data === undefined || !req.body.data) {
            res.json(false);
        } else {
            Model.modelGetByName(req.body.data.name)
                .then((result) => {
                    if (result == false) {
                        let data = {
                            name: req.body.data.name,
                            description: req.body.data.description,
                            code: req.body.data.code,
                            route: req.body.data.route,
                            order: req.body.data.order,
                            parent_id: req.body.data.parent_id,
                            type: req.body.data.type,
                            is_parent: req.body.data.is_parent,
                            created_at: UtilitiesModel.getDateTime(),
                        }

                        // console.log(data)

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
 * Get by Id
 */
exports.findById = (req, res, next) => {
    try {
        Model.modelGetById(req.query.id)
            .then((result) => {
                res.json({
                    result: result,
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