import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SelectSearch from "react-select-search";
import "./Forms.css"



export const FormFirst = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.one }, { errors: true });
  }, []);

  return (
    <form className="form">
      <input
        name="transferReason"
        placeholder="write your reason..."
        {...register('transferReason', { required: true })}
      />
    </form>
  );
};

export const FormOne = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  const options = [         //TO-DO: get all users names
    {name: 'User1', value:'1'},
    {name: 'User2',  value:'2'}
];
  let selectedName="";


  useEffect(() => {
    reset({ ...formContent.two }, { errors: true });
  }, []);



  return (
    <form className="form" >
        <input
        name="selectUser"
        placeholder="to who to transfer?..."
        {...register('selectUser', { required: true })}
       />
      <input
        type="number"
        name="amount"
        placeholder="amount in Lev Coins"
        {...register('amount', { required: true })}
      />
    </form> 
  );
};

export const FormTwo = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.three }, { errors: true });
  }, []);
  

  return (
    <form className="form" >
    <input
      name="confirmPassword"
      type="password"
      placeholder="write your password..."
      {...register('password', { required: true })}
    />
  </form>

  );
};

export const FormThree = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.four }, { errors: true });
  }, []);

  return (
    <form className="form">
    </form>
  );
};
