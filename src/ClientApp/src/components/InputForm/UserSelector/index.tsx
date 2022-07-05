import React from 'react';

import { UserSelectorProps, User } from './props';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

export const UserSelector = (props: UserSelectorProps) => {
  const { name, label, inputs, set, err } = props;
  const users: User[] = [
    { name: 'Adam', id: 1 },
    { name: 'Ken', id: 2 },
    { name: 'Razin', id: 3 },
    { name: 'Lachlan', id: 4 },
    { name: 'Xibo', id: 5 }
  ];

  const [NewUsers, SetNewUsers] = React.useState<number[]>([]);
  const addUser = (event: any) => SetNewUsers((old) => [...old, event.target.value]);
  const removeUser = (event: any) =>
    SetNewUsers((old) => old.filter((e) => e !== event.target.value));
  const submit = () => {
    set(name)(NewUsers);
    cancel();
  };
  const cancel = () => {
    SetNewUsers(() => []);
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    reason !== 'backdropClick' && setOpen(false);
  };

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
    <div>
      <Button onClick={openModal}>Add/Remove {label}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={closeModal}>
        <DialogTitle>Add/Remove {label}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={`select-${name}-inputlabel`}>Add {label}</InputLabel>
              <Select
                labelId={`select-${name}-label`}
                id={`select-${name}-id`}
                value={inputs[name]}
                onChange={addUser}
                input={<OutlinedInput label={label} />}>
                {users
                  .filter((user) => !inputs[name].includes(user.id) && !NewUsers.includes(user.id))
                  .map((user, idx) => (
                    <MenuItem key={`menuitem-add-usr-${idx}`} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={`select-${name}-inputlabel`}>Remove {label}</InputLabel>
              <Select
                labelId={`select-${name}-label`}
                id={`select-${name}-id`}
                value={inputs[name]}
                onChange={removeUser}
                input={<OutlinedInput label={label} />}>
                {users
                  .filter((user) => inputs[name].includes(user.id) || NewUsers.includes(user.id))
                  .map((user, idx) => (
                    <MenuItem key={`menuitem-remove-usr-${idx}`} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Close</Button>
          <Button onClick={submit}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></>}
    </div>
  );
};

// based on https://mui.com/material-ui/react-select/
