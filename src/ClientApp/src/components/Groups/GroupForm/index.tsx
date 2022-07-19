import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputField from '../../InputForm/InputFields';
import GroupFormProps from './props';

import GroupsIcon from '@mui/icons-material/Groups';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { UserSelector } from 'components/InputForm/UserSelector';
import { useState } from 'react';
import { UserDto } from 'api';

export const GroupForm = (props: GroupFormProps) => {
  const { title, inputs, fields, set, submit, cancel, setSelectedUsers } = props;

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <GroupsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {/* onSubmit={submit.func} */}
            {fields.map((field, idx) => {
              switch (field.type) {
                case 'users':
                  return (
                    <UserSelector setSelectedUsers={setSelectedUsers} />
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
              key={`submit-${title}`}
              to={submit.href}
              onClick={submit?.func}
              style={{ textDecoration: 'none' }}
            >
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                Confirm
              </Button>
            </Link>
            <Link
              id={`cancel-${title}`}
              to={cancel.href}
              // onClick={(event: React.MouseEvent) => cancel?.func(event)}
              style={{ textDecoration: 'none' }}
            >
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
