import React from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Context } from 'utility/Context';
import { ContextProps } from 'utility/Context/props';

import InputField from '../../InputForm/InputFields';
import { DateSelector } from '../../InputForm/DateSelector';
import LoginFormProps from './props';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export const LoginForm = (props: LoginFormProps) => {
  const context = React.useContext<ContextProps | null>(Context);
  const { title, inputs, fields, set, submit, cancel } = props;
  const [error, setError] = React.useState('');
  const theme = createTheme();

  const form_submit = async (event: any) => {
    const res = await submit.func(event);

    if (res?.error) {
      context?.logIn(false);
      setError(res.msg);
    } else {
      context?.logIn(true);
      setError('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {/* TODO: make this fit the width of the page */}
          {error !== '' ? <Alert severity="error">{error}</Alert> : <></>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {fields.map((field, idx) => {
              switch (field.type) {
                case 'date':
                  return (
                    <DateSelector
                      key={`date-${idx}`}
                      start={field.dates.start}
                      end={field.dates.end}
                      set={set}
                    />
                  );
                case 'span':
                  return (
                    <Alert key={`alert-${idx}`} severity="info">
                      {field.content}
                    </Alert>
                  );
                default:
                  return (
                    <InputField
                      key={`text-${idx}`}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      inputs={inputs}
                      set={set}
                      err={field.err}
                    />
                  );
              }
            })}
            <Link
              id={`submit-${title}`}
              to={submit.href}
              onClick={form_submit}
              style={{ textDecoration: 'none' }}
            >
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                Confirm
              </Button>
            </Link>
            <Link id={`cancel-${title}`} to={cancel.href} style={{ textDecoration: 'none' }}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 2 }}>
                {cancel.msg}
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

// based on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
