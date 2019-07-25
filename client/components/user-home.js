import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, balance} = props

  return (
    <div>
      <h2>Welcome, {firstName[0].toUpperCase() + firstName.substring(1)}!</h2>
      <h3>
        You have ${balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} to
        trade with today.
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    balance: state.user.balance
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
