const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  date: {
    type: Sequelize.DATE
  },
  transactionType: {
    type: Sequelize.ENUM('buy', 'sell'),
    allowNull: false
  },
  stockName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Transaction
