import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/transactions'

//importing Material UI components
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto'
  },
  tableRow: {
    width: '100%',
    margin: 'auto',
    stripedRows: true
  },
  body: {
    stripedRows: true
  },
  dropDown: {
    width: '100%',
    fullWidth: true,
    textSize: '1em'
  },
  tableCell: {
    fontSize: '1em',
    color: 'black'
  }
})

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    const {classes, transactions} = this.props
    console.log(transactions)
    return (
      <div id="transactionsTable">
        <h2>Transactions</h2>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell
                  width="20%"
                  align="left"
                  className={classes.tableCell}
                >
                  Date
                </TableCell>
                <TableCell
                  width="20%"
                  align="left"
                  className={classes.tableCell}
                >
                  Trade Type
                </TableCell>
                <TableCell
                  width="40%"
                  align="left"
                  className={classes.tableCell}
                >
                  Stock Symbol
                </TableCell>

                <TableCell
                  width="20%"
                  align="right"
                  className={classes.tableCell}
                >
                  Quantity
                </TableCell>
                <TableCell
                  width="20%"
                  align="right"
                  className={classes.tableCell}
                >
                  Price
                </TableCell>
                <TableCell
                  width="20%"
                  align="right"
                  className={classes.tableCell}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {transactions.length
                ? transactions.map(transaction => (
                    <TableRow hover key={transaction.id}>
                      <TableCell component="th" scope="row">
                        {transaction.date.slice(0, 10)}
                      </TableCell>
                      <TableCell align="left">
                        {transaction.transactionType}
                      </TableCell>
                      <TableCell align="left">
                        {transaction.stockName}
                      </TableCell>
                      <TableCell align="left">{transaction.quantity}</TableCell>
                      <TableCell align="right">
                        $
                        {transaction.price
                          ? transaction.price
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          : null}
                      </TableCell>
                      <TableCell align="right">
                        $
                        {transaction.total
                          ? transaction.total
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          : null}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody> */}
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state, 'state')
  return {
    transactions: state.transactions
  }
}

const mapDispatchToProps = dispatch => ({
  getTransactions: () => dispatch(getTransactions())
})

const WrappedTransactions = withStyles(styles)(Transactions)

export default connect(mapState, mapDispatchToProps)(WrappedTransactions)
