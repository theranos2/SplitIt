import React from 'react';
import PropTypes from 'prop-types';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export interface DateSelectorProps {
    start: Date,
    end: Date,
    set: Function
};

export const DateSelector = (props: DateSelectorProps) => {
    const { start, end, set } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DesktopDatePicker label="Start date" inputFormat="dd/MM/yyyy"
                    value={start} onChange={(new_start : Date) => set('start', new_start)}
                    renderInput={(props : Array<any>) => <TextField {...props} />}
                />
                { (start < new Date()) ? <Alert severity="warning">The start date must be in the future.</Alert> : <></> }
                <DesktopDatePicker label="End date" inputFormat="dd/MM/yyyy"
                    value={end} onChange={(new_end : Date) => set('end', new_end)}
                    renderInput={(props : any /*TODO: FIX THIS*/) => <TextField {...props} />}
                />
                { (end < start) ? <Alert severity="warning">End date must proceed start date.</Alert> : <></> }
            </Stack>
        </LocalizationProvider>
    );
}

DateSelector.propTypes = { 
    start: PropTypes.string,    // should be a date 
    end: PropTypes.string,      // should be a date
    set: PropTypes.func
};

// based on https://mui.com/x/react-date-pickers/getting-started/