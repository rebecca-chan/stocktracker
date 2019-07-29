import React from 'react'
import {connect} from 'react-redux'
import {submitTrade, validateTrade} from '../store/trade'

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
    width: '70%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    backgroundColor: 'transparent'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(3)
    // padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
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
      quantity: '',
      price: props.trade.latestPrice,
      balance: props.user.balance,
      transactionType: null
    }
  }

  handleChange = name => value => {
    this.setState({[name]: value})
    console.log('option selected', event)
  }

  async handleClick(evt) {
    evt.preventDefault()
    let stock = document.getElementById('stockName').value
    await this.props.validateTrade(stock)
    console.log(this.props, 'handleclick props access')
    this.setState({price: this.props.trade.latestPrice})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let total = (this.state.price * evt.target.quantity.value).toFixed(2)
    if (this.state.transactionType.value === 'buy') {
      total = -total
    }
    let newBalance = Number(total) + Number(this.state.balance)
    if (newBalance < 0) {
      alert('You do not have enough funds for this transaction')
    } else {
      let objToSubmit = {
        stockName: evt.target.stockName.value,
        quantity: evt.target.quantity.value,
        transactionType: this.state.transactionType.value,
        price: this.state.price,
        total
      }

      console.log(objToSubmit, 'submittedobject')
      this.props.submitTrade(objToSubmit)
    }
  }

  render() {
    const {classes, error, user} = this.props
    console.log(this.props)

    return (
      <div className="login-new">
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={createGenerateClassName.paper}>
            <Typography component="h1" variant="h5" className={classes.center}>
              Market Order Form
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit.bind(this)}
              name={name}
            >
              <FormControl margin="normal" required fullWidth>
                <TextField
                  required
                  id="stockName"
                  label="stockName"
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
                Look Up
              </button>
              {this.props.trade.latestPrice ? (
                <p>
                  {this.props.trade.symbol} latest price ${' '}
                  {this.props.trade.latestPrice}
                </p>
              ) : null}
              <FormControl margin="normal" required fullWidth>
                <TextField
                  required
                  id="quantity"
                  label="quantity"
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
              {error &&
                error.response && (
                  <div className="form-error"> {error.response.data} </div>
                )}
            </form>
          </Paper>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state, 'state')
  return {
    trade: state.trade,
    user: state.user,
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    validateTrade: stock => dispatch(validateTrade(stock)),
    submitTrade: order => dispatch(submitTrade(order))
  }
}

const WrappedTradeForm = withStyles(styles)(TradeForm)

export default connect(mapState, mapDispatchToProps)(WrappedTradeForm)
