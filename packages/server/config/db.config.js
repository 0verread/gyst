const Sequelize = require('sequelize');
const { db_password } = require('./envvars'); 
const db = {}

// Change the DB name and user 
const sequelize = new Sequelize('gystdb', 'root', db_password, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;