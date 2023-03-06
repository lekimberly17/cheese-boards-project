// user.test.js
const sequelize = require('sequelize');
const User = require('../models/User');
const Board = require('../models/Board');
const Cheese = require('../models/Cheese');

describe('User', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test('can create a user with associated boards and cheeses', async () => {
    // Create a new user
    const user = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });

    // Create two boards
    const board1 = await Board.create({
      type: 'Cheese board',
      description: 'A board of various cheeses',
      rating: 4
    });
    const board2 = await Board.create({
      type: 'Meat board',
      description: 'A board of various meats',
      rating: 5
    });

    // Associate boards with the user
    await user.addBoard(board1);
    await user.addBoard(board2);

    // Create two cheeses
    const cheese1 = await Cheese.create({
      name: 'Brie',
      origin: 'France',
      smelliness: 3
    });
    const cheese2 = await Cheese.create({
      name: 'Cheddar',
      origin: 'England',
      smelliness: 2
    });

    // Associate cheeses with the first board
    await board1.addCheese(cheese1);
    await board1.addCheese(cheese2);

    // Get the user and load its associated boards and cheeses
    const loadedUser = await User.findOne({
      where: { id: user.id },
      include: [{ model: Board, include: [Cheese] }]
    });

    // Check that the user and its associated boards and cheeses are loaded correctly
    expect(loadedUser.name).toBe('John Doe');
    expect(loadedUser.email).toBe('john.doe@example.com');
    expect(loadedUser.boards.length).toBe(2);
    expect(loadedUser.boards[0].type).toBe('Cheese board');
    expect(loadedUser.boards[0].description).toBe('A board of various cheeses');
    expect(loadedUser.boards[0].rating).toBe(4);
    expect(loadedUser.boards[0].cheeses.length).toBe(2);
    expect(loadedUser.boards[0].cheeses[0].name).toBe('Brie');
    expect(loadedUser.boards[0].cheeses[0].origin).toBe('France');
    expect(loadedUser.boards[0].cheeses[0].smelliness).toBe(3);
    expect(loadedUser.boards[0].cheeses[1].name).toBe('Cheddar');
    expect(loadedUser.boards[0].cheeses[1].origin).toBe('England');
    expect(loadedUser.boards[0].cheeses[1].smelliness).toBe(2);
    expect(loadedUser.boards[1].type).toBe('Meat board');
    expect(loadedUser.boards[1].description).toBe('A board of various meats');
    expect(loadedUser.boards[1].rating).toBe(5);
    expect(loadedUser.boards[1].cheeses.length).toBe(0);
  });
});

  //By generating a random email address for each test run, it ensures that the tests do not interfere with each other.

