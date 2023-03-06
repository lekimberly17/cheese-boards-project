const {Sequelize} = require('sequelize')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database123'
})

module.exports = db;