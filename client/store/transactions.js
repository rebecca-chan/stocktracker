import axios from 'axios'

const GOT_ALL_TRANSACTIONS = 'GOT_ALL_TRANSACTIONS'

export const gotAllTransactions = payload => ({
  type: GOT_ALL_TRANSACTIONS,
  payload
})

export const getTransactions = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/transactions/details`)
    dispatch(gotAllTransactions(data))
  } catch (error) {
    console.error(error)
  }
}

const transactionState = []

export default function transactionsReducer(state = transactionState, action) {
  switch (action.type) {
    case GOT_ALL_TRANSACTIONS:
      return [...action.payload]
    default:
      return state
  }
}
