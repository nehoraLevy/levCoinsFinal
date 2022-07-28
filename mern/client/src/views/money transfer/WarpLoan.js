import React, { useEffect } from "react";
import { FormStepper } from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
export default function WrapLoan()
{
    const methods = useForm({ mode: "onBlur" });
    const { watch, errors } = methods;
    useEffect(() => {
      console.log("FORM CONTEXT", watch(), errors);
    }, [watch, errors]);

    const stepDescription=["Fill Your Loan Details", "We want to verfiy you", "You Finished in success!"]
    const steps= ["Loans Details", "Verfiy", "Finish"];
    const header="Loan";
    return(
        <FormProvider {...methods}>
        <section>
                <FormStepper stepDescription={stepDescription} steps={steps} header={header}/>
        </section>
      </FormProvider>
    )
}