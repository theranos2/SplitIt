import React from 'react';

import { UserSelectorProps } from './props';
import { User } from '../InputFormProps';
import UserDisplay from 'components/Users/UsersDisplay';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

export const UserSelector = (props: UserSelectorProps) => {
  const { name, label, users, setUsers, err } = props;

  const addUser = (event: any) => setUsers([...users, event.target.value]);
  const removeUser = (event: any) =>
    setUsers(users.filter((user: number) => user !== event.target.value));

  const new_users: User[] = [
    { name: 'Adam', id: 1 },
    { name: 'Ken', id: 2 },
    { name: 'Razin', id: 3 },
    { name: 'Lachlan', id: 4 },
    { name: 'Xibo', id: 5 }
  ];

  /* TODO: actually fetch the users from the backend, rather than hardcode them */
  // React.useEffect(() => {
  //     const getUsers = () => {
  //         // users =
  //         // await request('/api/users/')
  //             // .then((res) => res.users)
  //             // .then
  //     }

  //     getUsers();
  //     // console.log(users);
  // }, [NewUsers]);

  return (
    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id={`select-${name}-inputlabel`}>Add {label}</InputLabel>
        <Select
          labelId={`select-${name}-label`}
          id={`select-${name}-id`}
          value={users}
          onChange={addUser}
          input={<OutlinedInput label={label} />}
        >
          {new_users
            .filter((user) => !users.includes(user.id))
            .map((user, idx) => (
              <MenuItem key={`menuitem-add-usr-${idx}`} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></>}
      <UserDisplay users={users} removeUser={removeUser} />
    </Box>
  );
};

// based on https://mui.com/material-ui/react-select/

/*
<FormControl sx={{ m: 1, minWidth: 120 }}>
  <InputLabel id={`select-${name}-inputlabel`}>Remove {label}</InputLabel>
  <Select
    labelId={`select-${name}-label`}
    id={`select-${name}-id`}
    value={inputs[name]}
    onChange={removeUser}
    input={<OutlinedInput label={label} />}
  >
    {users
      .filter((user) => inputs[name].includes(user.id) || NewUsers.includes(user.id))
      .map((user, idx) => (
        <MenuItem key={`menuitem-remove-usr-${idx}`} value={user.id}>
          {user.name}
        </MenuItem>
      ))}
  </Select>
</FormControl>
*/
