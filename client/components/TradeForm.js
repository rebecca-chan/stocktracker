import React from 'react'
import {connect} from 'react-redux'
import {submitTrade} from '../store/trade'

//materialui form components

import Button from '@material-ui/core/Button'
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
  },
  submit: {
    // marginTop: theme.spacing.unit * 3
    backgroundColor: 'teal',
    alignItems: 'center'
    // marginRight: theme.spacing()
  }
})

class TradeForm extends React.Component {
  render() {
    const {classes, handleSubmit, error} = this.props
    console.log(this.props, 'form props')
    return (
      <div className="login-new">
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={createGenerateClassName.paper}>
            <Typography component="h1" variant="h5" className={classes.center}>
              Market Order Form
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} name={name}>
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
              >
                Look Up
              </button>
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
                <TextField
                  required
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

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const stockName = evt.target.stockName.value
      const quantity = evt.target.quantity.value
      const transactionType = evt.target.transactionType.value
      const price = evt.target.price.value
      let total
      if (transactionType === 'buy') {
        total = -quantity * price
      } else {
        total = quantity * price
      }

      dispatch(submitTrade(stockName, quantity, transactionType, price, total))
    }
  }
}

const mapState = state => {
  console.log(state, 'state')
  return {
    transactions: state.transactions
  }
}

const WrappedTradeForm = withStyles(styles)(TradeForm)

export default connect(mapState, mapDispatchToProps)(WrappedTradeForm)
