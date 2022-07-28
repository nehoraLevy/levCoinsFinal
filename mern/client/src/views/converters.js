


import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import Axios from 'axios';
export default function ColorToggleButton(props) {
    const value=props.value;
    let from=props.type;
    const [alignment, setAlignment] = React.useState('web');
    let to="";
    const [info, setInfo] = useState([]);
    useEffect(() => {
        Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        .then((res) => {
        setInfo(res.data[from]);
        })
        }, [from]);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    function convertAmount(amount){
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    const convertShekelToDollars=()=>{
        if(to!=="usd"){
        from=to;
        to="usd";
        var rate = info[to];
        console.log(info[to])
        console.log(value * rate)
        document.getElementById("value").innerHTML=convertAmount((value * rate).toFixed(0));}
    }

    const convertDollarsToShekel=()=>{
        if(to!=="ils"){
        from=to;
        to="ils";
        var rate = info[to];
        console.log(value * rate)
        document.getElementById("value").innerHTML=convertAmount((value * rate).toFixed(0));}
    }
    return (
        <div>
            <div id="value" style={{"color":"black"}}>{convertAmount(value)}</div>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton id="shekels" value="shekels" onClick={convertDollarsToShekel}><span>&#8362;</span></ToggleButton>
                <ToggleButton value="dollars" onClick={convertShekelToDollars}><span>&#36;</span></ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
