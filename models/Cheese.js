const { DataTypes } = require('sequelize');
const db = require('../db');

const Cheese = db.define('Cheese', {
  name: {
    type: DataTypes.STRING,
  },
  origin: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  }
});

module.exports = Cheese;
