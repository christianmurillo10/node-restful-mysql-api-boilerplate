// Date and time
let nodeDateTime = require('node-datetime');

exports.getDate = () => {
    let dt = nodeDateTime.create();
    let date = dt.format('Y-m-d');
    return date;
};

exports.getTime = () => {
    let dt = nodeDateTime.create();
    let time = dt.format('H:M:S');
    return time;
};

exports.getDateTime = () => {
    let dt = nodeDateTime.create();
    let dateTime = dt.format('Y-m-d H:M:S');
    return dateTime;
};