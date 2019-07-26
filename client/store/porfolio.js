import axios from 'axios'
import {IEX_SK} from '../../secrets'
//actions
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'

export const gotPortfolio = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})

//?filter=symbol,volume,lastSalePrice
//?symbols=SNAP,fb
export const getPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/transactions/portfolio`)
    console.log(data, 'data in portfolio thunk')
    const portfolioStock = data
    const stocksArr = data.map(stock => stock.stockName)
    const allStocks = stocksArr.toString()
    console.log(allStocks, 'allstocks')
    // console.log(process.env.IEX_SK, 'processenv')
    const response = await axios.get(
      `https://cloud.iexapis.com/v1/tops?token=${
        process.env.IEX_SK
      }&symbols=${allStocks}`
    )
    console.log(response.data)
    let updatedStocks = response.data
    console.log(updatedStocks, 'updatedstocks')
    let combinedData = []
    for (let i = 0; i < updatedStocks.length; i++) {
      for (let j = 0; j < portfolioStock.length; j++) {
        console.log(updatedStocks[i], 'updatestock')
        console.log(portfolioStock[i], 'portfolio stock')
        if (updatedStocks[i].symbol === portfolioStock[j].stockName) {
          let combined = {...updatedStocks[i], ...portfolioStock[j]}
          combinedData.push(combined)
        }
      }
      console.log(combinedData, 'combinedData')
    }
    dispatch(gotPortfolio(combinedData))
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
