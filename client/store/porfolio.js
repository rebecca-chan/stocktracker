import axios from 'axios'
import {IEX_SK} from '../../secrets'

const GOT_PORTFOLIO = 'GOT_PORTFOLIO'

export const gotPortfolio = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})

export const getPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/transactions/portfolio`)
    const portfolioStocks = data

    //this IEX api call returns previous close price
    //OHLC api for open prices not available to free users
    const stocksArr = data.map(stock => encodeURIComponent(stock.stockName))
    stocksArr.map(async stock => {
      const closeData = await axios.get(
        `https://cloud.iexapis.com/v1/stock/${stock}/previous?token=${
          process.env.IEX_SK
        }`
      )
      const idx = portfolioStocks.findIndex(
        stockobj => stockobj.stockName === closeData.data.symbol
      )
      if (idx >= 0)
        portfolioStocks[idx] = {...portfolioStocks[idx], ...closeData.data}
    })

    //api requests sends current market prices
    const allStocks = stocksArr.toString()
    const response = await axios.get(
      `https://cloud.iexapis.com/v1/tops?token=${
        process.env.IEX_SK
      }&symbols=${allStocks}`
    )
    let currentPrices = response.data

    currentPrices.map(ele => {
      const idx = portfolioStocks.findIndex(
        stock => stock.stockName === ele.symbol
      )
      if (idx >= 0) {
        portfolioStocks[idx] = {...portfolioStocks[idx], ...ele}
      }
    })

    // add color to stocks based off trade prices
    for (let i = 0; i < portfolioStocks.length; i++) {
      portfolioStocks[i].change = Number(
        portfolioStocks[i].lastSalePrice - portfolioStocks[i].close
      )
      console.log(portfolioStocks[i])
      if (portfolioStocks[i].change === 0) portfolioStocks[i].color = 'gray'
      if (portfolioStocks[i].change < 0) portfolioStocks[i].color = 'red'
      if (portfolioStocks[i].change > 0) portfolioStocks[i].color = 'green'
    }

    dispatch(gotPortfolio(portfolioStocks))
  } catch (error) {
    console.error(error)
  }
}

const portfolioState = {
  portfolio: []
}

export default function transactionsReducer(state = portfolioState, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return [...state.portfolio, ...action.portfolio]
    default:
      return state
  }
}
