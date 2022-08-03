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
import ReactDOMServer from "react-dom/server";

let name=localStorage.getItem("user");


function createData(type,{amount,reciever,sender,transferId,loanId,date}) {

  let actionId;
  if(transferId===undefined){
    actionId=loanId
  }
  else{
    actionId=transferId
  }
  let side;
  if(name==sender){
    side=convertToArrow("-")

  }
  else{
    side=convertToArrow("+")
  }
  date=date.split(' ').slice(1, 4).join(' ');
  return {amount,type,reciever,side,sender,actionId,date};
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

function convertToArrow(type){
  if(type=='+'){
    return <span style={{color:"green"}}>&#8593;</span>
  }
  return <span style={{color:"red"}}>&#8595;</span>

}


function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
      <TableCell align="center">{row.actionId}</TableCell>
      <TableCell align="center">{row.type}</TableCell>
      <TableCell align="center">{row.side}</TableCell>
      <TableCell align="center">{convertAmount(row.amount)}</TableCell>
      <TableCell align="center">{row.date}</TableCell>

      </TableRow>
    </React.Fragment>
  );
}
function convertAmount(amount){
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let rows=[];
let current;
function rangeDays(date){
  let range=(Date.now()-(new Date(date)))/(1000 * 3600 * 24)
  return range
}

function updateCurrent(cur){
  let newElement=cur.map((row) => {
    console.log(row.side)
    return`<tr><td>${row.actionId}</td>
     <td>${row.type}</td>
     <td>${ReactDOMServer.renderToStaticMarkup(row.side)}</td>
     <td>${convertAmount(row.amount).toString()}</td>
     <td>${row.date}</td></tr>`
    }).join('')
  document.getElementById("data").innerHTML=newElement;

}
function currentBySliceTime(){
  const element = document.getElementById("times").value;
  switch(element){
    case "all":
      current=rows;
      updateCurrent(current)
      break;
      case "day":
        current=rows.filter((element)=>(rangeDays(element.date)<1))
        updateCurrent(current)
        break;
    case "week":
      current=rows.filter((element)=>(rangeDays(element.date)<7))
      updateCurrent(current)
      break;
    case "month":
      current=rows.filter((element)=>(rangeDays(element.date)<30))
      updateCurrent(current)
      break
    default:
      console.log("default")
  }
 }

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
    
    const getTrans = async () => {
      axios.get('http://localhost:5000/transaction/')   
      .then(response => {
        const res =response.data.filter((user) => (user.reciever===localStorage.getItem("user")||user.sender==localStorage.getItem("user")));
        res.forEach((trans)=>rows.push(createData("transfer",trans)))
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getData();
    getTrans();

    const getLoans = async () => {
      axios.get('http://localhost:5000/loans/')   
      .then(response => {
        const res =response.data.filter((user) => (user.reciever===localStorage.getItem("user")||user.sender==localStorage.getItem("user")));
        res.forEach((trans)=>rows.push(createData("loans",trans)))
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getLoans();
  }, []);
  current=rows;
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
        <select id="times"  onChange={()=>{currentBySliceTime()}} >
          <option value="all">all</option>      
          <option value="day">last day</option>
          <option value="week">last week</option>
          <option value="month">last month</option>
        </select> 
       </div>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <StyledTableCell align="center">actionId</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Side</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Action Date</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody id="data">
            {current.map((row) => (
                <Row id={row} key={row.accountID} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
