import React from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/transactions'

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

class Portfolio extends React.Component {
  componentDidMount() {
    console.log(this.props.getPortfolio)
    this.props.getPortfolio()
  }
  render() {
    console.log(this.props, 'this.props')
    const {classes, portfolio} = this.props
    console.log(portfolio, 'portfolio')
    return (
      <div id="transactionsTable">
        <h2>Porfolio</h2>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell
                  width="20%"
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
                  Current Price
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
            {/* <TableBody striped={true}>
            {portfolio.length? portfolio.map(stock => (
              <TableRow hover key={stock.id}>
                <TableCell component="th" scope="row">
                  {stock.stockName}
                </TableCell>
                <TableCell align="left">{stock.quantity}</TableCell>
                <TableCell align="left">{stock.currentPrice}</TableCell>
                <TableCell align="left">
                  {stock.quantity * stock.currentPrice}
                </TableCell>
                <TableCell align="right">
                  $
                  {stock.quantity
                    ? stock.quantity
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    : null}
                </TableCell>
                <TableCell align="right">
                  {stock.currentPrice
                    ? stock.currentPrice
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    : null}
                </TableCell>
                <TableCell align="right">
                  {stock.currentPrice && stock.quantity
                    ? (stock.currentPrice * stock.quantity)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    : null}
                </TableCell>
              </TableRow>
            )): null}
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
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => ({
  getPortfolio: () => dispatch(getPortfolio())
})

//   const WrappedPortfolio = withStyles(styles)(Portfolio)

export default connect(mapState, mapDispatchToProps)(Portfolio)
