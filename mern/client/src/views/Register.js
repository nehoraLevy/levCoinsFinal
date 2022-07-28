import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal'
import './Register.css';
import {useNavigate} from "react-router-dom"; 


let message="";
export default function RegisterForm(props) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    
    async function onSubmit(data) {

        const {username, password,confirmpwd, email, mobile, InitialAmount}=data;
        if (password !== confirmpwd) {
            message="Passwords do not match";
            //TO-DO- to empty the input boxes
        }

        localStorage.setItem("userInfo", JSON.stringify(data));

        
        const response= await fetch("http://localhost:5000/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password, email, mobile, InitialAmount}),
          })
          .catch(error => {
            window.alert(error);
            return;
          });
        console.log(response.json());

    }
    const handleSignIn=()=>{
        message="Your Request sended to manager!";
        setTimeout(()=>{            
        navigate("/")

        },4000);
    }

    return (

        <section>
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className="register">
                    <div className="col-1">
                        <h2 className='header'>Create New Account</h2>
                        <span>please, fill the fields</span>

                        <form id='RegisterField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("username")} placeholder='username' />
                            <input type="password" {...register("password")} placeholder='password' />
                            <input type="password" {...register("confirmpwd")} placeholder='confirm password' />
                            <input type="text" {...register("mobile", { required : true, maxLength: 10 })} placeholder='mobile number' />
                            <input type="email" {...register("email", { required : true, maxLength: 25 })} placeholder='email' />
                            <input type="text" {...register("InitialAmount", { required : true, maxLength: 10 })} placeholder='Initial amount $' />

                            {errors.mobile?.type === "required" && "Mobile Number is required"}
                            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
                            <button className='btn' onClick={handleSignIn}>Register</button>
                            <div className="messageAfterSign">{message}</div>
                        </form>

                    </div>
                    <div className="col-2">
                        <img src="https://notaryon-online.com/wp-content/uploads/2020/12/pexels-picjumbocom-461077-1.jpg" alt="" />
                    </div>
                </div>
            </Modal>
        </section>
    )
}





