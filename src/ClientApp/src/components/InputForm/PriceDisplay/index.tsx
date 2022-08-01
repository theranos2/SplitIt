import React from 'react';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import PriceProps from './props';

export const PriceDisplay = (props: PriceProps) => {
  const { price, set, disabled } = props;

  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
      <Input
        disabled={disabled}
        id="standard-adornment-amount"
        onChange={set}
        value={price}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </FormControl>
  );
};
