const db = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * This is for dynamic table_name
 */
const tableName = 'users';

/**
 * Create
 */
exports.modelCreate = (data) => {
    return new Promise((resolve) => {
        let values = [];
        let fields = '';
        let qMarks = '';

        for (let field in data) {
            values.push(data[field]);
            fields += field + ', ';
            qMarks += '?, ';
        }

        fields = fields.trim().substr(0, fields.length - 2);
        qMarks = qMarks.trim().substr(0, qMarks.length - 2);

        db.get().query('INSERT INTO ' + tableName + ' (' + fields + ') VALUES (' + qMarks + ')', values, (err, result) => {
            if (err) {
                resolve('Error');
                console.log(err);
            }

            resolve(result);
        });
    });
}

/**
 * Update
 */
exports.modelUpdate = (id, data) => {
    return new Promise((resolve) => {
        let values = [];
        let update = '';

        for (let field in data) {
            values.push(data[field]);
            update += field + ' = ?, ';
        }

        update = update.trim().substr(0, update.length - 2);
        values.push(id);

        db.get().query('UPDATE ' + tableName + ' SET ' + update + ' WHERE id = ?', values, (err, result) => {
            if (err) {
                resolve('Error');
                console.log(err);
            }

            resolve(result);
        });
    });
}

/**
 * Delete
 */
exports.modelDelete = (id) => {
    return new Promise((resolve) => {
        db.get().query('UPDATE ' + tableName + ' SET is_deleted = 1 WHERE id = ?', id, (err, result) => {
            if (err) {
                resolve('Error');
                console.log(err);
            }

            resolve(result);
        });
    });
}

/**
 * List All
 */
exports.modelGetAllData = () => {
    return new Promise((resolve) => {
        let res = {};
        // Get All
        let query1 = 'SELECT a.*, b.name AS position_name ';
        query1 += 'FROM `users` AS a JOIN `positions` AS b ';
        query1 += 'ON b.id = a.position_id ';
        query1 += 'WHERE a.is_deleted = 0 ORDER by a.id DESC';
        
        // Get Count
        let query2 = 'SELECT COUNT(*) as totalCount FROM ' + tableName + ' WHERE is_deleted = 0';

        db.get().query(query1, (err, result1) => {
            if (err) {
                resolve('Error');
                console.log(err);
            }

            db.get().query(query2, (err, result2) => {
                if (err) {
                    resolve('Error');
                    console.log(err);
                }

                res.result = result1;
                res.count = result2[0].totalCount;

                resolve(res);
            });
        });
    });
}

/**
 * List by username
 */
exports.modelGetByUsername = (value) => {
    return new Promise((resolve) => {
        db.get().query('SELECT * FROM ' + tableName + ' WHERE username = ? AND is_deleted = 0', value, (err, result) => {
            if (err) {
                console.log(err);
                resolve('Error');
            }

            result.length == 0 ? resolve(false) : resolve(result[0]);
        });
    });
}

/**
 * List by Id
 */
exports.modelGetById = (value) => {
    return new Promise((resolve) => {
        db.get().query('SELECT * FROM ' + tableName + ' WHERE id = ? AND is_deleted = 0', value, (err, result) => {
            if (err) {
                console.log(err);
                resolve('Error');
            }

            result.length == 0 ? resolve(false) : resolve(result[0]);
        });
    });
}

/**
 * Hash Password
 */
exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

/**
 * Validate Password
 */
exports.validatePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

/**
 * Generate jwt
 */
exports.generateJWT = (data) => {
    try {
        let today = new Date();
        let expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            username: data.username,
            id: data.id,
            exp: parseInt(expirationDate.getTime() / 1000, 10)
        }, 'secret');
    } catch (err) {
        console.log(err);
    }
}

/**
 * Auth JSON
 */
exports.toAuthJSON = (data) => {
    let userData = {
        email: data.email,
        username: data.username,
        position_id: data.position_id
    }

    return {
        _id: data.id,
        userData: userData,
        token: exports.generateJWT(data)
    };
}