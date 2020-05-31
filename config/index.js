require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    dbUser: 'b47fd523493b94',
    dbPass: 'c40a31fa',
    dbHost: 'us-cdbr-east-05.cleardb.net',
    dbName: 'heroku_e6d840453fc91e4'
};

module.exports = {config};