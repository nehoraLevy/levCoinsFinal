import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal'
import './Register.css';


function createData(id,name,password, email,address) {
    return {
        id,
        name,
        password,
        email,
        address
    };
  }
let message="";
export default function UpdateForm(props) {
    const rows = createData( 327009783,'john due','00010', 'a@gmail.com','a 69 jerusalem');

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const handleSignIn=()=>{
        if(document.getElementsByClassName("textAfterSign").password=="" || document.getElementsByClassName("textAfterSign").password==rows.password)
        {
            message="Your details updated!";
            console.log(document.getElementsByClassName("textAfterSign"));
            setTimeout(()=>{handleClose()},10000);
        }
        else{
            message="We can't update your details";
            console.log(document.getElementsByClassName("textAfterSign"));
            setTimeout(()=>{handleClose()},10000);
        }
    }

    /**onSubmit להוסיף בה לוגיקה של הוספה למונגו ושליחת מייל ואחר כך חזרה למסך הבית ואז יצטרך להתחבר כמו לקוח רשום  */
    //בנוסף יש לשלוח מייל למנהל לאישור 

    return (

        <section>
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className="register">
                    <div className="col-1">
                        <h2 className='header'>Update your personal details</h2>
                        <span>Please, fille the field you want update</span>

                        <form id='RegisterField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("id")} readonly="readonly" placeholder={rows.id} />
                            <input type="password" {...register("password")} placeholder='your password' />
                            <input type="password" {...register("newpwd")} placeholder='new password' />
                            <input type="text" {...register("name", { required : true, maxLength: 10 })} placeholder={rows.name} />
                            <input type="email" {...register("email", { required : true, maxLength: 25 })} placeholder={rows.email} />
                            <input type="text" {...register("address", { required : true, maxLength: 10 })} placeholder={rows.address} />

                            {errors.mobile?.type === "required" && "Mobile Number is required"}
                            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
                            <button className='btn' onClick={handleSignIn}>Sign In</button>
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





