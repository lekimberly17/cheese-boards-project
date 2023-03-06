// user.test.js
const { DataTypes } = require('sequelize');
const User = require('../models/User');
const Board = require('../models/Board');
const Cheese = require('../models/Cheese');


describe('Cheese model', () => {
  test('should create a Cheese', async () => {
    const cheese = await Cheese.create({
      name: 'Gouda',
      origin: 'Netherlands',
      description: 'A mild, yellow cheese',
    });
    expect(cheese.name).toBe('Gouda');
    expect(cheese.origin).toBe('Netherlands');
    expect(cheese.description).toBe('A mild, yellow cheese');
  });
});

describe('Board and User relationship', () => {
  test('should create a User with a Board', async () => {
    const user = await User.create({
      name: 'John',
      email: 'john@example.com',
    });
    const board = await Board.create({
      type: 'Favorites',
      description: 'My favorite cheeses',
      rating: 4,
    });
    await user.addBoard(board);
    const boards = await user.getBoards();
    expect(boards.length).toBe(1);
    expect(boards[0].type).toBe('Favorites');
  });
});

describe('Board and Cheese relationship', () => {
  test('should add a Cheese to a Board', async () => {
    const board = await Board.create({
      type: 'Favorites',
      description: 'My favorite cheeses',
      rating: 4,
    });
    const cheese = await Cheese.create({
      name: 'Gouda',
      origin: 'Netherlands',
      description: 'A mild, yellow cheese',
    });
    await board.addCheese(cheese);
    const cheeses = await board.getCheeses();
    expect(cheeses.length).toBe(1);
    expect(cheeses[0].name).toBe('Gouda');
  });
});

describe('Eager Loading', () => {
  test('should load a Board with its cheeses', async () => {
    const board = await Board.create({
      type: 'Favorites',
      description: 'My favorite cheeses',
      rating: 4,
    });
    const cheese = await Cheese.create({
      name: 'Gouda',
      origin: 'Netherlands',
      description: 'A mild, yellow cheese',
    });
    await board.addCheese(cheese);
    const boards = await Board.findAll({
      include: [ Cheese ]
    });
    expect(boards.length).toBe(1);
    expect(boards[0].type).toBe('Favorites');
    expect(boards[0].Cheeses.length).toBe(1);
    expect(boards[0].Cheeses[0].name).toBe('Gouda');
  });
});


  //By generating a random email address for each test run, it ensures that the tests do not interfere with each other.

