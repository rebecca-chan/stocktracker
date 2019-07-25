import axios from 'axios'

//actions
const GOT_ALL_TRANSACTIONS = 'GOT_ALL_TRANSACTIONS'
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const GOT_CURRENT_PRICES = 'GET_CURRENT_PRICES'

export const gotAllTransactions = transactions => ({
  type: GOT_ALL_TRANSACTIONS,
  transactions
})

export const gotPortfolio = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})

export const gotCurrentPrices = () => ({
  type: GOT_CURRENT_PRICES,
  currentPrices
})

export const getPortolio = () => async dispatch => {
  try {
    console.log('did you hit the thunk')
    const {data} = await axios.get(`api/transactions/portfolio`)
    console.log(data, 'data in thunk')
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.error(error)
  }
}

export const getTransactions = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/transactions/details`)
    console.log(data, 'data from got transactions')
    dispatch(gotAllTransactions(data))
  } catch (error) {
    console.error(error)
  }
}

//NEEDS UPDATE data passed needs to be /tops?symbols=SNAP,fb,AIG%2b
export const getCurrentPrices = stockList => async dispatch => {
  try {
    const {data} = await axios.get(
      `http://api.iextrading.com/1.0/tops/last?symbols=${stockList}%2b`
    )
    dispatch(gotCurrentPrices(data))
  } catch (error) {
    console.log(error)
  }
}

const transactionState = {
  transactions: [],
  portfolio: [],
  currentPrices: []
}

export default function transactionsReducer(state = transactionState, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return [...state.portfolio, ...action.portfolio]
    case GOT_ALL_TRANSACTIONS:
      return [...state.transactions, ...action.transactions]
    case GOT_CURRENT_PRICES:
      return [...state.currentPrices, ...action.currentPrices]
    default:
      return state
  }
}
