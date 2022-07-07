import React from 'react';

import DateSelectorProps from './props';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export const DateSelector = (props: DateSelectorProps) => {
  const { start, end, set } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Start date"
          inputFormat="dd/MM/yyyy"
          value={start}
          onChange={(new_start: Date | null) => set('start')(new_start)}
          renderInput={(props: any) => <TextField {...props} />}
        />
        {start < new Date() ? (
          <Alert severity="warning">The start date must be in the future.</Alert>
        ) : (
          <></>
        )}
        <DesktopDatePicker
          label="End date"
          inputFormat="dd/MM/yyyy"
          value={end}
          onChange={(new_end: Date | null) => set('end')(new_end)}
          renderInput={(props: any /*TODO: FIX THIS*/) => <TextField {...props} />}
        />
        {end < start ? <Alert severity="warning">End date must proceed start date.</Alert> : <></>}
      </Stack>
    </LocalizationProvider>
  );
};

// based on https://mui.com/x/react-date-pickers/getting-started/
