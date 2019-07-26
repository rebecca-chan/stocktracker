import axios from 'axios'
import {IEX_SK} from '../../secrets'

const SUBMIT_TRADE = 'SUBMIT_TRADE'
const VALIDATE_TRADE = 'VALIDATE_TRADE'

export const submittedTrade = payload => ({
  type: SUBMIT_TRADE,
  payload
})

export const validatedTrade = payload => ({
  type: VALIDATE_TRADE,
  payload
})

export const validateTrade = stock => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://cloud.iexapis.com/v1/tops?token=${
        process.env.IEX_SK
      }&symbols=${stock}`
    )
    let result
    if (data.length) {
      result = true
    } else result = false
    dispatch(validatedTrade(result))
  } catch (error) {
    console(error)
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
    console.log(data)
    dispatch(submittedTrade(data))
  } catch (error) {
    console.error(error)
  }
}

const formState = {
  validated: false
}

export default function transactionsReducer(state = formState, action) {
  switch (action.type) {
    case SUBMIT_TRADE:
      return {validated: false}
    case VALIDATE_TRADE:
      return {validated: action.payload}
    default:
      return state
  }
}
