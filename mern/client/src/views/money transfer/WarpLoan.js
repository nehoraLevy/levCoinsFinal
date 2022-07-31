import React, { useEffect, useState } from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import "./Wrap.css";

export default function WrapLoan()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        const response= await fetch("http://localhost:5000/loans/add", {
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