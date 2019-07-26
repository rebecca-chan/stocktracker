import axios from 'axios'
import {IEX_SK} from '../../secrets'

const GOT_SYMBOLS = 'GOT_SYMBOLS'

export const gotSymbols = symbols => ({
  type: GOT_SYMBOLS,
  symbols
})

export const getSymbols = () => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://cloud.iexapis.com/v1/ref-data/iex/symbols?token=${
        process.env.IEX_SK
      }`
    )
    dispatch(getSymbols(data))
  } catch (error) {
    console.error(error)
  }
}

const formState = {
  symbols: []
}

export default function transactionsReducer(state = formState, action) {
  switch (action.type) {
    case GOT_SYMBOLS:
      return [...state.symbols, ...action.symbols]
    default:
      return state
  }
}
