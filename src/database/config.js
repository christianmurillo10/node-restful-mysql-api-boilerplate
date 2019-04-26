var config;

console.log("Node Environment: ", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    config = {
        mysql: {
            host: 'localhost',
            database: 'node_restful_mysql_live',
            username: 'root',
            password: ''
        },
        api_url: 'http://localhost:3000',
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
        api_url: 'http://localhost:3000',
        socket_url: 'http://localhost:3005',
    };
}

module.exports = config;