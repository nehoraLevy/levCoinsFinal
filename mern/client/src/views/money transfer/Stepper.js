import React from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
//import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from "@mui/material/Typography";
import { FormOne, FormTwo, FormThree, FormFirst } from "./Forms";
import "./Stepper.css";
import io from "socket.io-client";
function chequeDetails(amount,type){
  if(type=="Transfer")
  {
    //----??------------------------------------
  }
  else if(type=="Loan")//אפשר להלוות וללוות
  {
    if(2*amount>localStorage.AmountInLevCoins)
    {
      //set invalid message---------------------------------
    }
  }
}

function getStepContent(step, formContent) {

  switch (step) {
    case 0:
      return <FormFirst {...{ formContent }} />; 
    case 1:
      return <FormOne {...{ formContent }} />;
    case 2:
      return <FormTwo {...{ formContent }} />
    case 3:
      return <FormThree {...{ formContent }} />;
    default:
      return "Unknown step";
  }
}

export const FormStepper = (props) => {
  const { watch, errors } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [compiledForm, setCompiledForm] = React.useState({});
  let steps = props.steps;
  let stepDescription=props.stepDescription;
  let header=props.header;
  const form = watch();
  let socket;
  function connectToSocket(){
  return new Promise(res=>{
    socket = io("http://localhost:5000", { transports : ['websocket'] });
    res(socket)
  })}
  connectToSocket().then(socket=>{socket.emit('message_on',"messasrtyuiouytrdyui");  })
  const send=()=>{
    console.log("55");
    socket.on('message_emit',alert("mess"));
  }
  send();

  const handleNext = () => {
    let canContinue = true;
    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, one: form });
        canContinue = true;
        break;
      case 1:
        setCompiledForm({ ...compiledForm, two: form });
        chequeDetails(form.amount,header);
        canContinue = true;
        break;
      case 2:
        setCompiledForm({ ...compiledForm, three: form });
        canContinue = true;
        //canContinue = handleSubmit({ ...compiledForm, three: form });
        break;
      case 3:
          setCompiledForm({ ...compiledForm, four: form });
          canContinue = handleSubmit({ ...compiledForm, four: form });
          break;
      default:
        return "not a valid step";
    }
    if (canContinue) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, two: form });
          break;
        case 2:
          setCompiledForm({ ...compiledForm, three: form });
          break;
        case 3:
            setCompiledForm({ ...compiledForm, four: form });
            break;
        default:
          return "not a valid step";
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompiledForm({});
  };

  const handleSubmit = form => {
    if (_.isEmpty(errors)) {
      props.onFinish(form);
      console.log("submit", form);
    }
  };

  return (
    <div className="stepper">
      <h2 className="text">{header}</h2>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel className="text" {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <>
              <Typography className="text">Completed</Typography>
              <Button onClick={handleReset}>Close</Button>
            </>
          </div>
        ) : (
          <>
            <div className="text" sx={{mt:2, mb:1}}>
              {stepDescription[activeStep]}
            </div>
            <div> 
              <div>
                {getStepContent(activeStep, compiledForm)}
                <div className="btnContainer">
                  <Button onClick={handleBack}>Back</Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>

    </div>
  );
};
