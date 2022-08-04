import React, { useEffect, useState } from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import "./Wrap.css";


import { updateUser } from "../../models/getUsers";
import axios from 'axios';

export default function WrapLoan()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [details,setDetails]=useState({});
    const [recieverName, setRecieverName]=useState({});

    async function addLoan({senderName, recieverName, amount})
    {
        const response= await fetch("http://localhost:5000/loans/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({sender:senderName, reciever: recieverName, amount}),
        })
        .catch(error => {
          window.alert(error);
          return;
        });

    }

    async function updateAmounts({amount})
    {
      const sender=details;
      sender.AmountInLevCoins-=Number(amount);
      sender.AmountInDollars=Number(sender.AmountInLevCoins*(1-(sender.userNumber-1)/100.0));
      updateUser(sender);
      window.reciever.AmountInLevCoins+=Number(amount);
      window.reciever.AmountInDollars=Number(window.reciever.AmountInLevCoins*(1-(window.reciever.userNumber-1)/100.0));
      updateUser(window.reciever);
    }

    useEffect(()=>{
      const getData = async () => {
        let name=localStorage.getItem("user");
        axios.get('http://localhost:5000/user/'+name)     
        .then(response => {
            setDetails(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        
      }
      getData();
    }, []);


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
        addLoan({senderName,recieverName,amount});
        updateAmounts({amount});
      }   
    }
  
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);

    const stepDescription=["Let's Go","Fill Your Loan Details", "We want to verfiy you", "You Finished in success!"]
    const steps= ["Let's Go","Loan Details", "Verfiy", "Finish"];
    const header="Loan";
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