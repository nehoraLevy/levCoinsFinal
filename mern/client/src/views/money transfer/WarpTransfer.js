
import React, { useEffect} from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";

import "./Wrap.css";

export default function WarpTransfer()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);

    async function handleFinish(data){
      let sender=localStorage.getItem("user");
      let reciever=data.two.selectUser;
      let amount=data.two.amount;
      let verify;
      if(data.three.password===localStorage.getItem("password"))
      {
        verify=true;
      }
      else{
        verify=false;
      }
      if(verify)
      {
        console.log(33);
        const response= await fetch("http://localhost:5000/transaction/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({sender, reciever, amount}),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
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