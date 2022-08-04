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
import axios from 'axios'
import{useEffect, useState } from "react";

function createData(loan) {
  let {loanId,amount,sender,reciever,date} = loan;
  date=date.split(' ').slice(1, 4).join(' ');
  return {
    loanId,amount,sender,reciever,date,
    details: [
      {
        interest: 0.001,
        loanDate:date,
        returnPeriod:"5 months",
        reason:"no reason"
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
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell align="center">{row.loanId}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
        <TableCell align="center">{row.sender}</TableCell>
        <TableCell align="center">{row.reciever}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
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
                    <TableCell align="center"><strong>interest</strong></TableCell>
                    <TableCell align="center"><strong>loanDate</strong></TableCell>
                    <TableCell align="center"><strong>returnPeriod</strong></TableCell>
                    <TableCell align="center"><strong>reason</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((historyRow) => (
                    <TableRow key={historyRow}>
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
    loanId: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    sender: PropTypes.string.isRequired,
    reciever: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        reason: PropTypes.string.isRequired,
        interest: PropTypes.number.isRequired,
        returnPeriod: PropTypes.string.isRequired,
        loanDate: PropTypes.string.isRequired,

      }),
    ).isRequired,
  }).isRequired,
};
export default function Loans() {
  const[loans,setLoan]=useState([]);
  useEffect(()=>{
  const getLoans = async () => {
    axios.get('http://localhost:5000/loans/')   
    .then(response => {
      const res=response.data.filter((user) => (user.reciever===localStorage.getItem("user")||user.sender==localStorage.getItem("user")));
      setLoan(res.map(i=>createData(i)));
      //res.forEach((loans)=>{console.log(loans);
      //  rows.push(createData(loans))})
    })
    .catch((error) => {
      console.log(error);
    })
  };
  getLoans();
})

  return (
 
    <div>
    <div id="header">
      <br/>
      <br/>
      <h2><strong>My Loans</strong></h2>
      <br/>
      <br/>
      <br/>

    </div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">loanId</StyledTableCell>
            <StyledTableCell align="center">amount</StyledTableCell>
            <StyledTableCell align="center">sender</StyledTableCell>
            <StyledTableCell align="center">reciever</StyledTableCell>
            <StyledTableCell align="center">date</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((row) => (
            <Row key={row.accountID} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
 );
}
