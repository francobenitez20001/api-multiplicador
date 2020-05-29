const mysql = require('mysql');
const {config} = require('../config/index');

class MysqlLib{
    constructor() {
        this.connection = mysql.createConnection({
            host:config.dbHost,
            user:config.dbUser,
            password:config.dbPass,
            database:config.dbName
        });
        return this.connection;
    }

    disconect(){
        this.connection.end();
    }

    connect(){
        this.connection.connect();
    }

}
module.exports = MysqlLib;