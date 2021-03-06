import axios from 'axios'

const GOT_PORTFOLIO = 'GOT_PORTFOLIO'

export const gotPortfolio = payload => ({
  type: GOT_PORTFOLIO,
  payload
})

export const getPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/transactions/portfolio`)
    const portfolioStocks = data

    let marketData = []
    for (let i = 0; i < portfolioStocks.length; i++) {
      const {data} = await axios.get(
        `api/transactions/iex/${portfolioStocks[i].stockName}`
      )
      marketData.push({...portfolioStocks[i], ...data})
    }

    for (let i = 0; i < marketData.length; i++) {
      if (marketData[i].change === 0) marketData[i].color = 'gray'
      if (marketData[i].change < 0) marketData[i].color = 'red'
      if (marketData[i].change > 0) marketData[i].color = 'green'
    }

    dispatch(gotPortfolio(marketData))
  } catch (error) {
    console.error(error)
  }
}

const portfolioState = []

export default function transactionsReducer(state = portfolioState, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return [...action.payload]
    default:
      return state
  }
}
