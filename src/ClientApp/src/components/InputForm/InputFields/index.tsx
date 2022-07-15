import React from 'react';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import InputFieldProps from './props';

const InputField = (props: InputFieldProps) => {
  const { name, label, type, inputs, set, err } = props;

  return (
    <>
      <TextField
        name={name}
        error={err.cond}
        label={label}
        type={type}
        id={name}
        value={inputs[name]}
        onChange={set(name)}
        margin="normal"
        required
        fullWidth
        autoComplete={name}
      />
      {err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></>}
    </>
  );
};

export default InputField;
