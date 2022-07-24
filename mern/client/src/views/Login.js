import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import RegisterForm from './Register.js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {getUsers, checkUser} from "./getUsers.js";
import './Login.css';
import UpdateForm from './updatePersonalDetails.js';

let openRegisterForm=false;

export default function LoginForm() {
    const [open, setOpen] = useState(true);
    const [message,setMessage]=useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    async function onSubmit(data)  {
        const {username, password}=data;

        localStorage.setItem("userInfo", JSON.stringify(data));
        
        const response=await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
          })
          .catch(error => {
            window.alert(error);
            return;
          });
        if(response.status==400)
        {
            setMessage("Invalid username");
        }
        else{
            setMessage("welcome to your account");
        }
        //console.log(response.json());
    }
    const handleClickRegisterLink=()=>
    {
        handleClose();
        openRegisterForm=true;
    }

    const handleSignIn=()=>{
        console.log(getUsers());
        setTimeout(()=>{handleClose()},60000);
    }

    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };
    
    const eye=<VisibilityIcon/>;

    //פה בלחיצה נבדוק במסד הנתונים האם המשתמש קיים והאם הסיסמאות תואמות ואםם כן יכנס לאזור האישי...   
    return (
        <section>
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className="login">
                    <div className="col-1">
                        <h2 className='header'>Login</h2>
                        <span>please, fill the fields</span>

                        <form id='LoginField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("username")} placeholder='username' />   
                            <input type={passwordShown ? "text" : "password"} {...register("password")} placeholder='password'></input> 
                            <i onClick={togglePassword}>{eye}</i>{" "}
                            <div className="messageAfterSign">{message}</div>
                            <button className='btn' onClick={handleSignIn}>Sign In</button>
                        </form>
                        <div className='textToRegister'>
                            Don't have an accoun?{" "}
                            <a className="linkToRegister" href="#" onClick={handleClickRegisterLink}>Resigter</a>
                        </div>
                    </div>
                </div>
            </Modal>
            <RegisterForm isOpen={openRegisterForm}></RegisterForm>
        </section>
    )
}














