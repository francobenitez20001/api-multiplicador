require('dotenv').config();


// const config = {
//     dev: process.env.NODE_ENV !== 'production',
//     port: process.env.PORT || 3000,
    
//     dbUser: 'b47fd523493b94',
//     dbPass: 'c40a31fa',
//     dbHost: 'us-cdbr-east-05.cleardb.net',
//     dbName: 'heroku_e6d840453fc91e4'
// };
 const config = {
     dev: process.env.NODE_ENV !== 'production',
     port: process.env.PORT || 3000,
     dbUser: process.env.DB_USER_DEV,
     dbPass: process.env.DB_PASSWORD_DEV,
     dbHost: process.env.DB_HOST_DEV,
     dbName: process.env.DB_NAME_DEV 
 };

module.exports = {config};