const Board = require('./Board');
const User = require('./User');
const Cheese = require('./Cheese');

Board.belongsTo(User);
User.hasMany(Board);


Cheese.belongsToMany(Board, {through: 'cheese_boards'});
Board.belongsToMany(Cheese, {through: 'cheese_boards'});


module.exports = {Board, User, Cheese}
