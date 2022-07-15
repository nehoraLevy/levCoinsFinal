import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import RegisterForm from './Register.js';
import './Login.css';

let openRegisterForm=false;

export default function LoginForm(props) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    const handleClickRegisterLink=()=>
    {
        handleClose();
        openRegisterForm=true;
    }
    //פה בלחיצה נבדוק במסד הנתונים האם המשתמש קיים והאם הסיסמאות תואמות ואםם כן יכנס לאזור האישי...
    if(!props.isOpen)
    {
        return null;
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
                            <input type="password" {...register("password")} placeholder='password' />
                            <button className='btn' onClick={handleClose}>Sign In</button>
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














