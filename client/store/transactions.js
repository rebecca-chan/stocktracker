import axios from 'axios'

//actions
const GOT_ALL_TRANSACTIONS = 'GOT_ALL_TRANSACTIONS'
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'

export const gotAllTransactions = transactions => ({
  type: GOT_ALL_TRANSACTIONS,
  transactions
})

export const gotPortfolio = transactions => ({
  type: GOT_PORTFOLIO,
  transactions
})

export const getPortolio = () => async dispatch => {
  try {
    const {data} = await axios.get(`/transactions/portfolio`)
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.error(error)
  }
}

export const getTransactions = () => async dispatch => {
  try {
    const {data} = await axios.get(`/transactions/details`)
    dispatch(gotAllTransactions(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  transactions: [],
  portfolio: []
}

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return [...state.portfolio, ...action.portfolio]
    case GOT_ALL_TRANSACTIONS:
      return [...state.transactions, ...action.transactions]
    default:
      return state
  }
}
