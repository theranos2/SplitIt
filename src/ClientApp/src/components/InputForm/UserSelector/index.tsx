import UserSelectorProps from './props';
import { User } from '../InputFormProps';
import UserDisplay from 'components/Users/UserDisplay';
import database from 'utility/database/database.json';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

export const UserSelector = (props: UserSelectorProps) => {
  const { name, label, users, setUsers, err } = props;

  const new_users: User[] = database.users;
  const addUser = (event: any) => setUsers([...users, new_users[event.target.value]]);
  const removeUser = (uid: User) => setUsers(users.filter((user: User) => user !== uid));

  /* TODO: actually fetch the users from the backend, rather than hardcode them */
  // React.useEffect(() => {
  //     const getUsers = () => {
  //         // users =
  //         // await request('/api/users/')
  //             // .then((res) => res.users)
  //             // .then
  //     }

  //     getUsers();
  // }, [NewUsers]);

  return (
    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id={`select-${name}-inputlabel`}>Add {label}</InputLabel>
        <Select
          labelId={`select-${name}-label`}
          id={`select-${name}-id`}
          value={users}
          onChange={addUser}
          input={<OutlinedInput label={label} />}
        >
          {new_users
            .filter((user) => !users.some((u) => u.id === user.id))
            .map((user, idx) => (
              <MenuItem
                key={`menuitem-add-usr-${idx}`}
                value={new_users.findIndex((u) => u.id === user.id)}
              >
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
