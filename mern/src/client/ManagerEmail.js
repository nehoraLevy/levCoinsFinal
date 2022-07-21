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

const rows = [
    createData( 327009783,'a',327009783, 20550,'wait to manager permission','12/12/2021'),
    createData( 327009784,'b',327009784, 2006,'wait to manager permission', '12/12/2021'),
    createData( 327009785,'c',327009785, 2070,'wait to manager permission', '12/12/2021'),
    createData( 327009786,'d',327009786, 2800,'wait to manager permission', '12/12/2021'),
  ];
function ManagerEmail(props) {
    const row=props.row 
    const [open, setOpen] = React.useState(false);
  return (<div>
    <List  sx={{ width: '2000%', maxWidth: 360,height:'100%' }}>
        <ListItem  alignItems="center" id={props.id}>
            <ListItemAvatar >
                <Avatar alt={row.name.toUpperCase()} src="/static/images/avatar/2.jpg" />
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
                                <TableCell ><strong>id: </strong>{row.id}</TableCell>
                                <TableCell ><strong>name: </strong>{row.name}</TableCell>
                                <TableCell ><strong>accountID: </strong>{row.accountID}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell ><strong>initialAmount: </strong>{row.initialAmount}</TableCell> 
                                <TableCell ><strong>requestDate: </strong>{row.requestDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><button className="button-8" onClick={()=>{addClient(row)}}>accept</button></TableCell>
                                <TableCell><button className="button-8" onClick={()=>{notAddClient(row)}}>refuse</button></TableCell>
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
    return (<div>
        <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo16g_ubmhj-czYTbIy6GN21VUH0L01T8pzA&usqp=CAU" alt=""></img>

        <div className='emailForm'>Lev Coins member request</div>
        <div>  bvc</div>
            <div>
                {rows.map((row) => (
                    <ManagerEmail id={row.id} key={row.accountID} row={row} />
                ))}
            </div>
        </div>)
}