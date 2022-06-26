import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputField from './input-fields';
import DateSelect from './date-select';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

interface PropTypes {
    title: String,
    inputs: Object,
    set: Function,
    submit: Object,
    cancel: Object,
    fields: Array<any>
}

const InputForm = (props : PropTypes) => {
    const { title, inputs, set, submit, cancel, fields } = props;
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">{title}</Typography>
                    <Box component="form" onSubmit={() => submit.func()} noValidate sx={{ mt: 1 }}>
                        { fields.map((field, idx) => {
                            switch (field.type) {
                                case 'date':
                                    return <DateSelect key={`date-${idx}`} dates={field.dates} set={set}/>;
                                case 'span':
                                    return <Alert key={`alert-${idx}`} severity="info">{field.content}</Alert>;
                                default:
                                    return <InputField key={`text-${idx}`} name={field.name} label={field.label} type={field.type} inputs={inputs} set={set} err={field.error}/>;
                            }
                        }) }
                        <Link id="confirm" to={submit.href} onClick={(event : Event) => submit.func(event)} style={{ textDecoration: 'none' }}>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Confirm</Button>
                        </Link>
                        <Link id="cancel" to={cancel.href} onClick={(event : Event) => (cancel.func) && cancel.func(event)} style={{ textDecoration: 'none' }}>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 2 }}>{cancel.msg}</Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
  );
};

InputForm.propTypes = {
  title: PropTypes.string,
  inputs: PropTypes.object,
  set: PropTypes.func,
  submit: PropTypes.object,
  cancel: PropTypes.object,
  fields: PropTypes.array
};

export default InputForm;

// based on https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in