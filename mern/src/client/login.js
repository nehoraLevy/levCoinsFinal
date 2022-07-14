import React from 'react'
import { useForm } from 'react-hook-form';
import './login.css';


export default function LoginForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    //פה בלחיצה נבדוק במסד הנתונים האם המשתמש קיים והאם הסיסמאות תואמות ואםם כן יכנס לאזור האישי...    
  return (
    <section>

        <div className="login">
            <div className="col-1">
                <h2 className='header'>Login</h2>
                <span>please,fill the field</span>

                <form id='LoginField' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("username")} placeholder='username' />
                    <input type="text" {...register("password")} placeholder='password' />
                    <button className='btn'>Sign In</button>
                </form>

            </div>
            <div className="col-2">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/001/339/293/small/bank-card-background-free-vector.jpg" alt="" />
            </div>
        </div>
    </section>
  )
}














