
import React, { useEffect, useState } from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";


export default function WarpTransfer()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);

    async function handleFinish(data){
      let sender=localStorage.getItem("user");
      let reciever=data.one.selectUser;
      let amount=data.one.amount;
      let reason=data.one.transferReason;
      let verify;
      if(data.two.password===localStorage.getItem("password").password)
      {
        verify=true;
      }
      else{
        verify=false;
      }
      if(verify)
      {
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


    const stepDescription=["Fill Your Transfer Details", "We want to verfiy you", "You Finished in success!"]
    const steps= ["Transfer Details", "Verfiy", "Finish"];
    const header="Transfer";
    return(
        <FormProvider {...methods}>
        <section>
            <Modal style={{display:'block',alignItems:'center',justifyContent:'center'}}  disableEnforceFocus open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <FormStepper stepDescription={stepDescription} steps={steps} header={header} onFinish={handleFinish} />
            </Modal>
        </section>
      </FormProvider>
    )
}