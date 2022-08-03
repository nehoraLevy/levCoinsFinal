
import React, { useEffect, useState} from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";

import { getUserByName, updateUser } from "../getUsers";
import axios from 'axios';

import "./Wrap.css";

export default function WarpTransfer()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);

    const [details,setDetails]=useState({});
    const [reciever, setReciever]=useState({});
    const [recieverName, setRecieverName]=useState({});
    const [isFetch, setIsFetch]=useState(false);
  
    
    useEffect(()=>{
      const getData = async () => {
        let name=localStorage.getItem("user");
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

    useEffect(()=>{
      console.log(recieverName);
      const getData = async () => {
        axios.get('http://localhost:5000/user/'+recieverName)     
        .then(response => {
            setReciever(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        
      }
      getData();
    }, [recieverName]);


    async function addTransfer({senderName, recieverName, amount})
    {

        const response= await fetch("http://localhost:5000/transaction/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({senderName, recieverName, amount}),
        })
        .catch(error => {
          window.alert(error);
          return;
        });

    }

    async function updateAmounts({senderName, recieverName, amount})
    {
      const sender=details;
      sender.AmountInLevCoins-=amount;
      sender.AmountInDollars=sender.AmountInLevCoins*(1-(sender.userNumber-1)/100.0);
      updateUser(sender);
      if(reciever){
        reciever.AmountInLevCoins+=amount;
        reciever.AmountInDollars=reciever.AmountInLevCoins*(1-(reciever.userNumber-1)/100.0);
        updateUser(reciever);
      }
    }


    async function handleFinish(data){
      let senderName=localStorage.getItem("user");
      let recieverName=data.two.selectUser;
      setRecieverName(recieverName);
      let amount=data.two.amount;
      let password=data.three.password;

      let verify;
      if(password===localStorage.getItem("password"))
      {
        verify=true;
      }
      else{
        verify=false;
      }
      if(verify)
      {
        addTransfer({senderName,recieverName,amount});
        updateAmounts({senderName,recieverName,amount});
      }   
    }


    const stepDescription=["Let's Go","Fill Your Transfer Details", "We want to verfiy you", "You Finished in success!"]
    const steps= ["Let's Go","Transfer Details", "Verfiy", "Finish"];
    const header="Transfer";
    return(
      <div>
      <img src='https://www.wealthandfinance-news.com/wp-content/uploads/2020/01/market.jpg' className="background" alt=''/>
        <FormProvider {...methods}>
        <section>
                <FormStepper stepDescription={stepDescription} steps={steps} header={header} onFinish={handleFinish}/>
        </section>
        </FormProvider>
        </div>
    )
}