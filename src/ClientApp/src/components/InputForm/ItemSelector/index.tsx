import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { ItemSelectorProps } from './props';
import { Item, User } from '../InputFormProps';

export const ItemSelector = (props: ItemSelectorProps) => {
  const { name, label, inputs, set, err } = props;

  const [currentItem, setCurrentItem] = React.useState<Item>({
    name: '',
    id: 0,
    price: 0,
    user: 0
  });

  const setItem = (name: string) => (event: any) =>
    setCurrentItem((old) => ({ ...old, [name]: event.target.value }));

  const submit = (event: any) => {
    event.preventDefault();

    set(name)((old: Record<string, any>) => ({
      ...old,
      inputs: [...inputs['users'], currentItem]
    }));

    cancel();
  };

  const cancel = () => {
    setCurrentItem(() => {
      return { name: '', id: 0, price: 0, user: 0 };
    });
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
  // }, [currentItem]);

  return (
    <div>
      <Button onClick={openModal}>Add/Remove {label}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={closeModal}>
        <DialogTitle>Add/Remove {label}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                id="outlined-number"
                label="Name"
                type="text"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                id="outlined-number"
                label="Price"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
              <InputLabel id={`select-${name}-inputlabel`}>Add {label}</InputLabel>
              <Select
                labelId={`select-${name}-label`}
                id={`select-${name}-id`}
                value={inputs['users']}
                label="Choose users"
                onChange={setItem(name)}
                input={<OutlinedInput label={label} />}
              >
                {inputs['users'].map((user: User, idx: number) => (
                  <MenuItem key={`menuitem-user-${idx}`} value={user.id}>
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
