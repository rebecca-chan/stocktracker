const express = require('express')
const router = express.Router()
const {Transactions} = require('../db/models')

function isAuthenticated(req, res, next) {
  if (req.user.id) {
    return next()
  } else {
    res.status(403).end()
  }
}

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const response = await Transactions.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(response)
    }
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const tradeInfo = req.body
    const transaction = await Transaction.create({
      total: tradeInfo.total,
      balance: tradeInfo.balance,
      transactionType: tradeInfo.transactionType,
      stockName: tradeInfo.stockName,
      quantity: tradeInfo.quantity,
      price: tradeInfo.price,
      userId: tradeInfo.userId
    })
    console.log(transaction)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})
