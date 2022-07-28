
import React, { useEffect} from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";

export default function WarpTransfer()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);
    const stepDescription=["Fill Your Transfer Details", "We want to verfiy you", "You Finished in success!"]
    const steps= ["Transfer Details", "Verfiy", "Finish"];
    const header="Transfer";
    return(
        <FormProvider {...methods}>
        <section>
            <FormStepper stepDescription={stepDescription} steps={steps} header={header} />
        </section>
      </FormProvider>
    )
}