import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SelectSearch from "react-select-search";
import "./Forms.css"
export const FormOne = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;
  const options = [
    {name: 'User1', value: '1'},
    {name: 'User2', value: '2'}
];

  useEffect(() => {
    reset({ ...formContent.one }, { errors: true });
  }, []);

  return (
    <form className="form">
      <SelectSearch
        name="selectUser"
        placeholder="to who to transfer?..."
        options={options}
        {...register('selectUser', { required: true })}
      />
      <input
        type="number"
        name="amount"
        placeholder="amount to transfer"
        {...register('amount', { required: true })}
      />
      <input
        name="transferReason"
        placeholder="write your transfer reason..."
        {...register('transferReason', { required: true })}
      />
    </form>
  );
};

export const FormTwo = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.two }, { errors: true });
  }, []);

  return (
      <form className="form">
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
    reset({ ...formContent.three }, { errors: true });
  }, []);

  return (
    <form className="form">
    </form>
  );
};