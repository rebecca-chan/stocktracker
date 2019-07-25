const express = require('express')
const router = express.Router()
const {Transaction, User} = require('../db/models')
module.exports = router

function isAuthenticated(req, res, next) {
  if (req.user.id) {
    return next()
  } else {
    res.status(403).end()
  }
}

//gets balance of latest transaction
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findAll({
        where: {
          id: req.user.id
        }
      })
      res.send(user)
    }
  } catch (error) {
    console.log(error)
  }
})

//gets accumulated active stocks
router.get('/portfolio', isAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const allStocks = await Transaction.findAll({
        where: {
          userId: req.user.id
        }
      })

      const stocksSummed = allStocks.reduce((acc, currentStock, stockIdx) => {
        const idx = acc.findIndex(
          stock => stock.stockName === currentStock.stockName
        )
        idx < 0
          ? acc.push(currentStock)
          : (acc[idx].quantity += currentStock.quantity)
        return acc
      }, [])

      const positives = stocksSummed.filter(stock => stock.quantity > 0)
      res.json(positives)
    }
  } catch (error) {
    console.error(error)
  }
})

//gets every transaction
router.get('/details', isAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const response = await Transaction.findAll({
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
      transactionType: tradeInfo.transactionType,
      stockName: tradeInfo.stockName,
      quantity: tradeInfo.quantity,
      price: tradeInfo.price,
      userId: tradeInfo.userId
    })

    const userBalance = await User.findAll({
      where: {
        userId: req.user.Id
      }
    })

    const newBalance = userBalance + req.body.total

    const userUpdate = await User.update(
      {balance: newBalance},
      {
        where: {
          userId: req.user.Id
        }
      }
    )
    console.log(userUpdate)
    console.log(transaction)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})
