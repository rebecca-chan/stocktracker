import React from 'react'
import {connect} from 'react-redux'

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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
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
    float: 'right'
  }
})

export default class TradeForm extends React.Component {
  constructor() {
    super()
  }

  render() {
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
              <FormControl margin="normal" required fullWidth>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit" // variant="contained"
                color="inherit"
                className={classes.submit}
              >
                {displayName}
              </Button>
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
