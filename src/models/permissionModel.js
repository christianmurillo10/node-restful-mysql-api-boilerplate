const db = require('../database/db');

/**
 * This is for dynamic table_name
 */
const tableName = 'permissions';

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
        let query1 = 'SELECT * FROM ' + tableName + ' WHERE is_deleted = 0 ORDER by `id` DESC';
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
 * List by name
 */
exports.modelGetByName = (value) => {
    return new Promise((resolve) => {
        db.get().query('SELECT * FROM ' + tableName + ' WHERE name = ? AND is_deleted = 0', value, (err, result) => {
            if (err) {
                console.log(err);
                resolve('Error');
            }

            result.length == 0 ? resolve(false) : resolve(result[0]);
        });
    });
}

/**
 * Get by Id
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