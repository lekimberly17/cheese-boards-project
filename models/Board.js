const { DataTypes } = require('sequelize');
const db = require('../db');

const Board = db.define('Board', {
  type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
  }
});

module.exports = Board;
