
import React, { useEffect, useState } from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import Modal from '@mui/material/Modal'


export default function WrapStepper()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);
    return(
        <FormProvider {...methods}>
        <section>
            <Modal style={{display:'block',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <FormStepper />
            </Modal>
        </section>
      </FormProvider>
    )
}