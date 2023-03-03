const Sequelize  = require('sequelize');
const db = require('../config/db.config.js');

module.exports = db.sequelize.define(
  'todolist',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    isDone: {
      type: Sequelize.BOOLEAN
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)