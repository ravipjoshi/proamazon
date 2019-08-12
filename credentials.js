var credentials = require("./credentials.js");
console.log(`Loading require Credentials`);

exports.dataBase={
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.UNAME,
    password: process.env.PASSWORD,
    dbName: process.env.DATABASE
}