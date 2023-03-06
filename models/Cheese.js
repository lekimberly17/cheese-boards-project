const { DataTypes } = require('sequelize');
const db = require('../db');

const Cheese = db.define('Cheese', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Cheese;
