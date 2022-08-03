import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SelectSearch from "react-select-search";
import "./Forms.css"
import axios from "axios";


export const FormFirst = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.one }, { errors: true });
  }, []);

  return (
    <form className="form">
      <input
        name="transferReason"
        placeholder="write your reason..."
        {...register('transferReason', { required: true })}
      />
    </form>
  );
};

export const FormOne = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  const options = [         //TO-DO: get all users names
    {name: 'User1', value:'1'},
    {name: 'User2',  value:'2'}
];
  let selectedName="";

  const [details,setDetails]=useState([]);
  const [isFetch, setIsFetch]=useState(false);
  
  useEffect(()=>{
    const getData = async () => {
      axios.get('http://localhost:5000/user/')   
      .then(response => {
          setDetails(response.data.filter((user) => (user.name!==localStorage.getItem("user"))));
          setIsFetch(true);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getData();
  }, []);

  useEffect(() => {
    reset({ ...formContent.two }, { errors: true });
  }, []);

  function checkReciever(){
    const value=document.getElementsByName("selectUser")[0].value;
    console.log(details);
    if(details.filter((i=>i.name===value))){
      window.reciever=details.find(i=> i.name==value);
    }
    else{
      alert("This user is not exists");
    }
  }

  return (
    <form className="form" >
        <input
        name="selectUser"
        placeholder="to who to transfer?..."
        onInput={()=>checkReciever()}
        {...register('selectUser', { required: true })}
       />
      <input
        type="number"
        name="amount"
        placeholder="amount in Lev Coins"
        {...register('amount', { required: true })}
      />
    </form> 
  );
};

export const FormTwo = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.three }, { errors: true });
  }, []);
  

  return (
    <form className="form" >
    <input
      name="confirmPassword"
      type="password"
      placeholder="write your password..."
      {...register('password', { required: true })}
    />
  </form>

  );
};

export const FormThree = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.four }, { errors: true });
  }, []);

  return (
    <form className="form">
    </form>
  );
};
