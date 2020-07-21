const mysql = require('mysql');
const {config} = require('../config/index');

const connection = mysql.createPool({
    host:config.dbHost,
    user:config.dbUser,
    database:config.dbName,
    password:config.dbPass
});

module.exports = connection;