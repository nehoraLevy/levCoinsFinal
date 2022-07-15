import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal'
import './register.css';


export default function RegisterForm(props) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    /**onSubmit להוסיף בה לוגיקה של הוספה למונגו ושליחת מייל ואחר כך חזרה למסך הבית ואז יצטרך להתחבר כמו לקוח רשום  */
    //בנוסף יש לשלוח מייל למנהל לאישור 
    if(!props.isOpen)
    {
        return null;
    }
    return (

        <section>
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className="register">
                    <div className="col-1">
                        <h2 className='header'>Sign In</h2>
                        <span>please,fill the field</span>

                        <form id='RegisterField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("username")} placeholder='username' />
                            <input type="text" {...register("password")} placeholder='password' />
                            <input type="text" {...register("confirmpwd")} placeholder='confirm password' />
                            <input type="text" {...register("mobile", { required : true, maxLength: 10 })} placeholder='mobile number' />
                            <input type="text" {...register("InitialAmount", { required : true, maxLength: 10 })} placeholder='Initial amount $' />

                            {errors.mobile?.type === "required" && "Mobile Number is required"}
                            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
                            <button className='btn' onClick={handleClose}>Sign In</button>
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





