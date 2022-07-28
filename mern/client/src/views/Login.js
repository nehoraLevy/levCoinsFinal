import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import {getUsers} from "./getUsers.js";
import './Login.css';
import {useNavigate} from "react-router-dom"; 

export default function LoginForm() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [message,setMessage]=useState("");
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
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
            navigate("/client")
        }
    }
    const handleClickRegisterLink=()=>
    {
        navigate("/Register")
        handleClose();
    }

    const handleSignIn=()=>{
        console.log(getUsers());
        setTimeout(()=>{handleClose()},60000);
    }

    return (
        <section>
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className="login">
                    <div className="col-1">
                        <h2 className='header'>Login</h2>
                        <span>please, fill the fields</span>
                        <form id='LoginField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("username")} placeholder='username' />   
                            <input type={"password"} {...register("password")} placeholder='password'></input> 
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
        </section>
    )
}














