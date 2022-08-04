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




function ManagerEmail(props) {
    const detail=props.detail;
    const [open, setOpen] = React.useState(false);

    async function deleteUser(userDeleteName) {
        await fetch(`http://localhost:5000/${userDeleteName}`, {
            method:"DELETE",
        })
        .then()
        .catch((error) => {
            console.log(error);
            });
    }
    
    async function updateUser(userUpdate){
        const name=userUpdate.name;
        await fetch(`http://localhost:5000/update/${name}`, {
            method: "POST",
            body: JSON.stringify(userUpdate),
            headers: {
                'Content-Type': 'application/json'
            },
            });
    }
    async function addClient(){
        document.getElementById(props.id).remove();
        props.detail.status="accepted";
        updateUser(props.detail);
    }

    async function notAddClient(){
        document.getElementById(props.id).remove();
        deleteUser(props.detail.name);
    }



  return (<div>
    <List  sx={{ width: '2000%', maxWidth: 360,height:'100%' }} id={props.id}>
        <ListItem  alignItems="center" >
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
                                <TableCell ><strong>initial Amount: </strong>{detail.AmountInDollars}</TableCell> 
                                <TableCell ><strong>initial Amount Lev Coins: </strong>{detail.AmountInLevCoins}</TableCell> 
                                <TableCell ><strong>request Date: </strong>{detail.date}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><button className="button-8" onClick={()=>{addClient()}}>accept</button></TableCell>
                                <TableCell><button className="button-8" onClick={()=>{notAddClient()}}>refuse</button></TableCell>
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
    if(window.setManagerAlert)
    {
      console.log("32");
      alert(`user ${window.setManagerAlert.name}'s balance go to 0`);
    }
    
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
                {details.map((detail, index) => (
                    <ManagerEmail id={index} key={index} detail={detail} />
                ))}
            </div>
        </div>)
}
