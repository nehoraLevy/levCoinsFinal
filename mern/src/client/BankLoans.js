import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';

function createData(side,accountID, amount,interest,returnPeriod,status,reason,loanDate) {
  return {
    side,accountID, amount,status,
    details: [
      {
        status:status,
        interest: interest,
        loanDate:loanDate,
        returnPeriod: returnPeriod,
        reason:reason
      },

    ],
  };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#99c2ff",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const Styled2TableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e6f2ff",
  }
}));
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">{row.side}</TableCell>
        <TableCell align="center">{row.accountID}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <Styled2TableCell align="center">status</Styled2TableCell>
                    <Styled2TableCell align="center">interest</Styled2TableCell>
                    <Styled2TableCell align="center">loanDate</Styled2TableCell>
                    <Styled2TableCell align="center">returnPeriod</Styled2TableCell>
                    <Styled2TableCell align="center">reason</Styled2TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((historyRow) => (
                    <TableRow key={historyRow}>
                      <TableCell align="center">{historyRow.status}</TableCell>
                      <TableCell align="center">{historyRow.interest}</TableCell>
                      <TableCell align="center">{historyRow.loanDate}</TableCell>
                      <TableCell align="center">{historyRow.returnPeriod}</TableCell>
                      <TableCell align="center">{historyRow.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    side: PropTypes.string.isRequired,
    accountID: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,

    details: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string.isRequired,
        reason: PropTypes.string.isRequired,
        interest: PropTypes.number.isRequired,
        returnPeriod: PropTypes.string.isRequired,
        loanDate: PropTypes.string.isRequired,

      }),
    ).isRequired,
  }).isRequired,
};
const rows = [
  createData('lend', 327009783, 200, 0.01, '5 month','allowed','none', '12/12/2021'),
  createData('lended', 327000000, 100000, 0.005,'1 year','refused','to many lended requested','12/07/2022'),
];
console.log(rows)
export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">side</StyledTableCell>
            <StyledTableCell align="center">AcoountId</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.accountID} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
