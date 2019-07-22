const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: '5000'
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
