const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// create a database connection
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// connect to MYSQL server
connection.connect(error=> {
  if (error) throw error;
  console.log("Successfully connected to database");
});

module.exports = connection;