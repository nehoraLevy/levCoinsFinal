import React, { useEffect, useState } from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import Modal from '@mui/material/Modal'

export default function WrapLoan()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function handleFinish(data){
      console.log("23:", data);
    }
  
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);

    const stepDescription=["Fill Your Loan Details", "We want to verfiy you", "You Finished in success!"]
    const steps= ["Loans Details", "Verfiy", "Finish"];
    const header="Loan";
    return(
        <FormProvider {...methods}>
        <section>
            <Modal style={{display:'block',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <FormStepper stepDescription={stepDescription} steps={steps} header={header} onFinish={handleFinish}/>
            </Modal>
        </section>
      </FormProvider>
    )
}