const { DataTypes } = require('sequelize');
const db = require('../db');

const Board = db.define('Board', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Board;
