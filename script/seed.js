'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'murphy',
      email: 'cody@email.com',
      balance: 3900,
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'mcmurphy',
      balance: 3200,
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Rebecca',
      lastName: 'Chan',
      balance: 200,
      email: 'chan.rebecca@gmail.com',
      password: '123'
    })
  ])

  const transactions = await Promise.all([
    Transaction.create({
      date: '2018-10-15 19:10:25-07',
      transactionType: 'buy',
      stockName: 'SHOP',
      quantity: 10,
      price: 100,
      total: -1000,
      userId: 1
    }),
    Transaction.create({
      date: '2018-10-16 19:10:25-07',
      transactionType: 'buy',
      stockName: 'PLNT',
      quantity: 20,
      price: 30,
      total: -600,
      userId: 1
    }),
    Transaction.create({
      date: '2018-12-30 19:10:25-07',
      transactionType: 'sell',
      stockName: 'PLNT',
      quantity: -10,
      price: 50,
      total: 500,
      userId: 1
    }),
    Transaction.create({
      date: '2019-01-29 19:10:25-07',
      transactionType: 'buy',
      stockName: 'AMZN',
      quantity: 1,
      price: 1800,
      userId: 2,
      total: -1800
    }),
    Transaction.create({
      date: '2018-10-15 19:10:25-07',
      transactionType: 'buy',
      stockName: 'SHOP',
      quantity: 10,
      price: 100,
      total: -1000,
      userId: 3
    }),
    Transaction.create({
      date: '2018-10-16 19:10:25-07',
      transactionType: 'buy',
      stockName: 'PLNT',
      quantity: 20,
      price: 30,
      total: -600,
      userId: 3
    }),
    Transaction.create({
      date: '2018-12-30 19:10:25-07',
      transactionType: 'sell',
      stockName: 'PLNT',
      quantity: -10,
      price: 50,
      total: 500,
      userId: 3
    }),
    Transaction.create({
      date: '2019-01-29 19:10:25-07',
      transactionType: 'buy',
      stockName: 'AMZN',
      quantity: 1,
      price: 1800,
      userId: 3,
      total: -1800
    }),
    Transaction.create({
      date: '2019-01-29 19:10:25-07',
      transactionType: 'buy',
      stockName: 'FB',
      quantity: 8,
      price: 100,
      userId: 3,
      total: -800
    }),
    Transaction.create({
      date: '2019-01-29 19:10:25-07',
      transactionType: 'buy',
      stockName: 'AIG+',
      quantity: 6,
      price: 50,
      userId: 3,
      total: -300
    })
  ])

  console.log(
    `seeded ${users.length} users, seeded ${transactions.length} transactions`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
