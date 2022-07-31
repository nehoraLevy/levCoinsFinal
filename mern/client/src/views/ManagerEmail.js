import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell  from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import {useEffect, useState} from "react";
import axios from 'axios';
import "./ManagerEmail.css";

function createData(id,name,accountID, initialAmount,status,requestDate) {
    return {
        id,
        name,
        status,
        accountID,
        initialAmount,
        requestDate,
    };
  }

function addClient(prop){
    //addClient to mongodb
    console.log(prop.id)
    document.getElementById(prop.id).remove()
} 

function notAddClient(prop){
    document.getElementById(prop.id).remove()
    alert("the clients refused succefully");

}

function ManagerEmail(props) {
    const detail=props.detail;
    const [open, setOpen] = React.useState(false);
  return (<div>
    <List  sx={{ width: '2000%', maxWidth: 360,height:'100%' }}>
        <ListItem  alignItems="center" id={props.id}>
            <ListItemAvatar >
                <Avatar alt={detail.name.toUpperCase()} src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText 
            primary="Open account request number "
            secondary={
            <div>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <div >
                    <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableBody>
                            <TableRow>
                                <TableCell ><strong>name: </strong>{detail.name}</TableCell>
                                <TableCell ><strong>account ID: </strong>{detail.userNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell ><strong>initialAmount: </strong>{detail.AmountInDollars}</TableCell> 
                                <TableCell ><strong>initial Amount Lev Coins: </strong>{detail.AmountInLevCoins}</TableCell> 
                                <TableCell ><strong>request Date: </strong>{detail.date}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><button className="button-8" onClick={()=>{addClient(detail)}}>accept</button></TableCell>
                                <TableCell><button className="button-8" onClick={()=>{notAddClient(detail)}}>refuse</button></TableCell>
                            </TableRow>
                    </TableBody>
                    </Table>
                </div>
                </Collapse>
            </div>
            }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
    </List>
</div>
  );
}

export default function ManageEmails(){
    const [details,setDetails]=useState([]);
    const [isFetch, setIsFetch]=useState(false);
    
    useEffect(()=>{
      const getData = async () => {
        axios.get('http://localhost:5000/user/')   
        .then(response => {
            setDetails(response.data.filter((user) => (user.status==="wait to confirm"&&user.name!=="admin")));
            setIsFetch(true);
        })
        .catch((error) => {
          console.log(error);
        })
      }
      getData();
    }, []);
    return (<div>
        <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo16g_ubmhj-czYTbIy6GN21VUH0L01T8pzA&usqp=CAU" alt=""></img>

        <div className='emailForm'>Lev Coins member request</div>
            <div>
                {details.map((detail) => (
                    <ManagerEmail id={detail.userNumber} key={detail.userNumber} detail={detail} />
                ))}
            </div>
        </div>)
}
