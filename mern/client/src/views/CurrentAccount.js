import * as React from 'react';
import{useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Converters from './converters';
import "./CurrentAccount.css";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import io from "socket.io-client";

let name=localStorage.getItem("user");


function createData(actionId,type,side,accountID, amount,actionDate) {

  return {
    actionId,type,side, accountID,amount,actionDate
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
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell align="center">{row.actionId}</TableCell>
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="center">{convertToArrow(row.side)}</TableCell>
        <TableCell align="center">{row.accountID}</TableCell>
        <TableCell align="center">{convertAmount(row.amount)}</TableCell>
        <TableCell align="center">{row.actionDate}</TableCell>

      </TableRow>
    </React.Fragment>
  );
}
function convertAmount(amount){
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function convertToArrow(type){
  if(type=='+'){
    return <span style={{color:"green"}}>&#8593;</span>
  }
  return <span style={{color:"red"}}>&#8595;</span>
}
Row.propTypes = {
    row: PropTypes.shape({
    actionId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    accountID: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    actionDate: PropTypes.string.isRequired,
  }).isRequired,
};

let rows={};



rows.data = [
  createData(123,'lend','+', 327009783, 200,  '12/12/2021'),
  createData(1234,'transfer','+', 32700001, 100000, '12/07/2022'),
  createData(123334,'transfer','+', 327002000, 1000540, '12/05/2022'),
  createData(22,'lend','+', 32700090, 1000540, '12/05/2022'),
  createData(123334,'transfer','+', 327003010, 1000540, '12/05/2022'),
  createData(33,'lend','+', 3272000, 1040540, '12/05/2022'),
  createData(123334,'transfer','+', 327003000, 1000540, '12/05/2022'),
  createData(44,'transfer','+', 3270000002, 1000540, '12/05/2022'),
  createData(123334,'transfer','+', 327030000, 1000540, '12/05/2022'),
  createData(123334,'transfer','+', 3274000000, 1000540, '12/05/2022'),
  createData(5543,'lend','+', 3270000, 1000540, '12/05/2022'),
  createData(123334,'transfer','-', 3270400000, 1000540, '12/05/2022'),
  createData(2233,'transfer','-', 327005000, 1000540, '12/05/2022'),
  createData(123334,'transfer','-', 3276000000, 1000540, '12/05/2022'),
  createData(123334,'transfer','-', 327007000, 1000540, '12/05/2022'),
  createData(123334,'transfer','-', 327009000, 1000540, '12/05/2022'),
  createData(123334,'transfer','-', 327000020, 1000540, '12/05/2022'),
  createData(123334,'transfer','-', 327002001, 1000540, '12/05/2022'),
];

export default function CurrentAccount(){
  const navigate = useNavigate();
  const [details,setDetails]=useState({});
  const [isFetch, setIsFetch]=useState(false);

  const [socket, setSocket] = useState(null);


  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", localStorage.getItem("user"));
  }, [socket]);

  const func1=()=>{socket?.emit("sendNotification", {
    senderName: name,
    receiverName:'admin',
  });}
  useEffect(()=>{
    const getData = async () => {
      axios.get('http://localhost:5000/user/'+name)     
      .then(response => {
          setDetails(response.data);
          setIsFetch(true);
      })
      .catch((error) => {
        console.log(error);
      })
      
    }
    getData();
  }, []);

  localStorage.setItem('AmountInDollars',details.AmountInDollars)
  localStorage.setItem('AmountInLevCoins',details.AmountInLevCoins)
  if(localStorage.AmountInDollars==0){
    ///socket to manager ----------------------------------------------------------------
  }
  function OpenChat()
  {
    document.getElementById("header").classList.add("blure")
    navigate("/client/Chat")
  }

  return (
    <div id="header">
      <div >
        <h1>Hello {localStorage.getItem("user")}</h1>
        <h4>account id: {isFetch ? Number(details.userNumber) : " "}</h4>
        <h4>ballance:<Converters value={isFetch ? Number(details.AmountInDollars): 0} type="usd" levCoin={details.AmountInLevCoins}></Converters></h4>
        <div className='icon' onClick={()=>{OpenChat()}}/>
      </div>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <StyledTableCell align="center">ActionId</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Side</StyledTableCell>
                <StyledTableCell align="center">AccountID</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Action Date</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.data.map((row) => (
                <Row id={row} key={row.accountID} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
