var config;

console.log("Node Environment: ", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'testing') {
    config = {
        mysql: {
            host: 'localhost',
            database: 'node_restful_mysql_live',
            username: 'root',
            password: ''
        },
        api_url: 'http://localhost:5003',
        socket_url: 'http://localhost:3005',
    };
} else {
    config = {
        mysql: {
            host: 'localhost',
            database: 'node_restful_mysql_live',
            username: 'root',
            password: ''
        },
        api_url: 'http://localhost:5003',
        socket_url: 'http://localhost:3005',
    };
}

module.exports = config;