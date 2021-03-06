import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

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
    width: '50%',
    marginTop: theme.spacing(3),
    margin: 'auto',
    backgroundColor: 'transparent'
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    marginTop: theme.spacing()
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  submit: {
    backgroundColor: 'teal',
    margin: 'auto'
  }
})

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const {classes} = props
  return (
    <div>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={createGenerateClassName.paper}>
          <Typography component="h1" variant="h5" className={classes.center}>
            {displayName}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} name={name}>
            {name === 'signup' && (
              <div>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    autoComplete="given-name"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    autoComplete="family-name"
                    autoFocus
                  />
                </FormControl>
              </div>
            )}
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="email"
                label="Email"
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
            <button
              type="submit" // variant="contained"
              color="inherit"
            >
              {displayName}
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

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign In',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Register',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(
  withStyles(styles)(AuthForm)
)
export const Signup = connect(mapSignup, mapDispatch)(
  withStyles(styles)(AuthForm)
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
