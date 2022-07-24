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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    async function onSubmit(data)  {
        //console.log(data);
        const {username, password}=data;
        console.log(getUsers());
        //console.log(checkUser({username, password}));
    }
    const handleClickRegisterLink=()=>
    {
        handleClose();
        openRegisterForm=true;
    }

    const handleSignIn=()=>{
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













