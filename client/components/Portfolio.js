import React from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/porfolio'
import axios from 'axios'

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
    margin: 'auto'
  },
  tableCell: {
    fontSize: '1em'
  }
})

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getPortfolio()
  }
  render() {
    const {classes, portfolio} = this.props
    console.log(this.props, 'porfolio props')
    return (
      <div id="transactionsTable">
        <h2>Portfolio</h2>

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
            <TableBody>
              {portfolio.length
                ? portfolio.map(stock => (
                    <TableRow key={stock.id} style={{color: 'red'}}>
                      <TableCell component="th" scope="row">
                        {stock.stockName}
                      </TableCell>
                      <TableCell align="right">{stock.quantity}</TableCell>
                      <TableCell align="right">
                        ${stock.lastSalePrice
                          ? stock.lastSalePrice
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          : null}
                      </TableCell>
                      <TableCell align="right">
                        ${(stock.quantity * stock.lastSalePrice)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
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

const WrappedPortfolio = withStyles(styles)(Portfolio)

export default connect(mapState, mapDispatchToProps)(WrappedPortfolio)
