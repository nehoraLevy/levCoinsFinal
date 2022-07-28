import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import './updatePersonalDetails.css';


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
export default function UpdateDetails(props) {
    const rows = createData( 327009783,'john due','00010', 'a@gmail.com','a 69 jerusalem');

    const [ setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        <div className="register">
            <div className="col-1">
                <h3 className='header'>Update your personal details</h3>
                <h5 style={{"color":"gray"}}>Please, fille the field you want update</h5>
                <form id='RegisterField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="password" {...register("password")} placeholder='your password' />
                    <input type="password" {...register("newpwd")} placeholder='new password' />
                    <input type="text" {...register("name", { required : true, maxLength: 10 })} placeholder={rows.name} />
                    <input type="email" {...register("email", { required : true, maxLength: 25 })} placeholder={rows.email} />
                    <input type="text" {...register("address", { required : true, maxLength: 10 })} placeholder={rows.address} />
                    <button className='btn' onClick={handleSignIn}>Submit</button>
                    <div className="messageAfterSign">{message}</div>
                </form>
            </div>
            <div className="col-2">
                <img src="https://notaryon-online.com/wp-content/uploads/2020/12/pexels-picjumbocom-461077-1.jpg" alt="" />
            </div>
        </div>
    )
}
