import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';

import InputProps from './Props';
import { UserSelector } from '../InputForm/UserSelector';

const theme = createTheme();

const GroupCreate = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [] });

  const set = (name: string) => (input: any) => {
    name == 'users'
      ? input.forEach((e: number) => inputs['users'].push(e))
      : setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (inputs.name === '' || inputs.users.length === 0) {
      return console.error('Inputs cannot be empty');
    }
    console.log(inputs);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <GroupsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create group
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Group name"
              name="name"
              autoFocus
            />
            <InputLabel id="users_select_label">Add users</InputLabel>
            <Select
              required
              fullWidth
              name="users"
              labelId="users_select_label"
              label="Add users"
              id="group_users"
            >
              <MenuItem value={1}>Adam</MenuItem>
              <MenuItem value={2}>Jingcheng</MenuItem>
              <MenuItem value={3}>Xibo</MenuItem>
              <MenuItem value={4}>Lachlan</MenuItem>
              <MenuItem value={5}>Special K</MenuItem>
              <MenuItem value={6}>Raxzin</MenuItem>
            </Select>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GroupCreate;
