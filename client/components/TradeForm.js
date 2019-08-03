import React from 'react'
import {connect} from 'react-redux'
import {submitTrade, validateTrade, getQuantity} from '../store/trade'

//materialui form components
import Select from 'react-select'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import {createGenerateClassName} from '@material-ui/styles'

const styles = theme => ({
  main: {
    width: '50%',
    margin: 'auto',
    backgroundColor: 'transparent'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    marginTop: theme.spacing()
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing()
  }
})

class TradeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockName: '',
      quantity: 0,
      sharesOwned: 0,
      price: props.trade.latestPrice,
      balance: props.user.balance,
      transactionType: null
    }
  }

  handleChange = name => value => {
    this.setState({[name]: value})
  }

  async handleClick(evt) {
    evt.preventDefault()
    let stock = document.getElementById('stockName').value
    await this.props.validateTrade(stock)
    this.setState({price: this.props.trade.latestPrice})
    await this.props.getQuantity(stock)
    this.setState({sharesOwned: this.props.trade.sharesOwned})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let transactionType = this.state.transactionType.value
    let total = (this.state.price * evt.target.quantity.value).toFixed(2)
    if (transactionType === 'buy') {
      total = -total
    }
    let quantity = evt.target.quantity.value
    if (transactionType === 'sell') {
      quantity = -quantity
    }
    let newQuantity = Number(this.state.sharesOwned) + Number(quantity)
    if (
      transactionType === 'sell' &&
      (newQuantity < 0 || !this.state.sharesOwned)
    ) {
      alert('You do not have enough shares to sell')
    } else {
      let newBalance = Number(total) + Number(this.state.balance)
      if (newBalance < 0) {
        alert('You do not have enough funds for this transaction')
      } else {
        let objToSubmit = {
          stockName: evt.target.stockName.value.toUpperCase(),
          quantity,
          transactionType,
          price: this.state.price,
          total
        }
        this.props.submitTrade(objToSubmit)
        alert('Your order has been submitted')
      }
    }
  }

  render() {
    const {classes, user} = this.props
    return (
      <div className="login-new">
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={createGenerateClassName.paper}>
            <Typography component="h1" variant="h5" className={classes.center}>
              Market Order Form
            </Typography>
            {
              <p>
                Funds for trading: ${user.balance.replace(
                  /\d(?=(\d{3})+\.)/g,
                  '$&,'
                )}
              </p>
            }
            <form
              className={classes.form}
              onSubmit={this.handleSubmit.bind(this)}
              name={name}
            >
              <FormControl margin="normal" required fullWidth>
                <TextField
                  required
                  id="stockName"
                  label="Stock Symbol"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  autoFocus
                />
              </FormControl>
              <button
                type="submit" // variant="contained"
                color="inherit"
                onClick={this.handleClick.bind(this)}
              >
                Look Up Stock Information
              </button>
              {this.props.trade.latestPrice ? (
                <p>
                  {this.props.trade.symbol} latest price ${' '}
                  {this.props.trade.latestPrice}
                </p>
              ) : null}
              {this.props.trade.error ? <p>{this.props.trade.error} </p> : null}
              <FormControl margin="normal" required fullWidth>
                <TextField
                  required
                  id="quantity"
                  label="Quantity"
                  type="quantity"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
                <Select
                  options={[
                    {value: 'buy', label: 'Buy'},
                    {value: 'sell', label: 'Sell'}
                  ]}
                  required
                  value={this.state.transactionType}
                  onChange={this.handleChange('transactionType')}
                  id="transactionType"
                  label="transactionType"
                  type="transactionType"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </FormControl>
              <button
                type="submit" // variant="contained"
                color="inherit"
              >
                Submit Order
              </button>
            </form>
          </Paper>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {
    trade: state.trade,
    user: state.user,
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    validateTrade: stock => dispatch(validateTrade(stock)),
    submitTrade: order => dispatch(submitTrade(order)),
    getQuantity: stock => dispatch(getQuantity(stock))
  }
}

const WrappedTradeForm = withStyles(styles)(TradeForm)

export default connect(mapState, mapDispatchToProps)(WrappedTradeForm)
