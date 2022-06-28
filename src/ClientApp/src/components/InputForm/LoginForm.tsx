import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputField from './InputFields';
import { DateSelector } from './DateSelector';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export interface ButtonSubmitProps {
    href: string,
    func?: Function,
    msg?: string
}

interface LoginFormProps {
    title: String,
    inputs: Object,
    set: Function,
    submit: ButtonSubmitProps,
    cancel: ButtonSubmitProps,
    fields: Array<any>      // TODO: should be the actual types
}

export const LoginForm = (props : LoginFormProps) => {
    const { title, inputs, fields, set, submit, cancel } = props;
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">{title}</Typography>
                    <Box component="form" onSubmit={() => submit.func && submit.func()} noValidate sx={{ mt: 1 }}>
                        { fields.map((field, idx) => {
                            switch (field.type) {
                                case 'date':
                                    return <DateSelector key={`date-${idx}`} start={field.dates.start} end={field.dates.end} set={set}/>;
                                case 'span':
                                    return <Alert key={`alert-${idx}`} severity="info">{field.content}</Alert>;
                                default:
                                    return <InputField key={`text-${idx}`} name={field.name} label={field.label} type={field.type} inputs={inputs} set={set} err={field.error}/>;
                            }
                        }) }
                        <Link id={`submit-${title}`} to={submit.href} onClick={(event : React.MouseEvent) => submit.func && submit.func(event)} style={{ textDecoration: 'none' }}>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Confirm</Button>
                        </Link>
                        <Link id={`cancel-${title}`} to={cancel.href} onClick={(event : React.MouseEvent) => (cancel.func) && cancel.func(event)} style={{ textDecoration: 'none' }}>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 2 }}>{cancel.msg}</Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

LoginForm.propTypes = {
  title: PropTypes.string,
  inputs: PropTypes.object,
  fields: PropTypes.array,
  set: PropTypes.func,
  submit: PropTypes.object,
  cancel: PropTypes.object,
};

// based on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in