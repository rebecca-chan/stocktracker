import axios from 'axios'
import {IEX_SK} from '../../secrets'

const SUBMIT_TRADE = 'SUBMIT_TRADE'
const VALIDATE_TRADE = 'VALIDATE_TRADE'
const GOT_QUANTITY = 'GOT_QUANTITY'

export const submittedTrade = payload => ({
  type: SUBMIT_TRADE,
  payload
})

export const validatedTrade = payload => ({
  type: VALIDATE_TRADE,
  payload
})

export const gotQuantity = payload => ({
  type: GOT_QUANTITY,
  payload
})

export const validateTrade = stock => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://cloud.iexapis.com/v1/stock/${stock}/quote?token=${
        process.env.IEX_SK
      }`
    )
    dispatch(validatedTrade(data))
  } catch (error) {
    dispatch(validatedTrade({error: 'Invalid Stock Symbol'}))
  }
}

export const getQuantity = stock => async dispatch => {
  try {
    const {data} = await axios.get(`api/transactions/portfolio/${stock}`)
    let number = {sharesOwned: data}
    dispatch(gotQuantity(number))
  } catch (error) {
    console.error(error)
  }
}

export const submitTrade = ({
  stockName,
  quantity,
  total,
  transactionType,
  price
}) => async dispatch => {
  try {
    const {data} = await axios.post(`api/transactions`, {
      stockName,
      quantity,
      total,
      transactionType,
      price
    })

    let status = {submitStatus: data}
    dispatch(submittedTrade(status))
  } catch (error) {
    console.error(error)
  }
}

const formState = {}

export default function transactionsReducer(state = formState, action) {
  switch (action.type) {
    case SUBMIT_TRADE:
      return {}
    case VALIDATE_TRADE:
      return {...action.payload}
    case GOT_QUANTITY:
      return {...state, ...action.payload}
    default:
      return state
  }
}
