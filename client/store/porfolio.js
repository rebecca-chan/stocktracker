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
    await stocksArr.map(async stock => {
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

    //add color to stocks based off trade prices
    portfolioStocks.map(stockinfo => {
      stockinfo.change = Number(stockinfo.close - stockinfo.lastSalePrice)
      if (stockinfo.change === 0) stockinfo.color = 'gray'
      if (stockinfo.change < 0) stockinfo.color = 'red'
      if (stockinfo.change > 0) stockinfo.color = 'green'
    })

    console.log(portfolioStocks, 'porfolioStocks')

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
