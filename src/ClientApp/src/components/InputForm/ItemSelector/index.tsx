import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ItemDisplay from 'components/Users/ItemDisplay';
import { ItemSelectorProps } from './props';
import { Item, User } from '../InputFormProps';

export const ItemSelector = (props: ItemSelectorProps) => {
  const { name, label, items, setItems, users, err } = props;

  const [currentItem, setCurrentItem] = React.useState<Item>({
    name: '',
    id: 0,
    price: 0,
    user: 0
  });

  const setItem = (name: string) => (event: any) =>
    setCurrentItem((old) => ({ ...old, [name]: event.target.value }));
  const cancel = () => setCurrentItem({ name: '', id: 0, price: 0, user: 0 });

  const addItem = (event: any) => {
    event.preventDefault();
    items && setItems([...items, currentItem]);
    cancel();
  };

  const removeItem = (iid: Item) => setItems(items?.filter((item: Item) => item !== iid));

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
    <>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Grid container spacing={1}>
            <Grid item xs>
              <TextField
                id="outlined-number"
                label="Name"
                type="text"
                value={currentItem.name}
                onChange={setItem('name')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} sm={3} md>
              <TextField
                id="outlined-number"
                label="Price"
                value={currentItem.price}
                onChange={setItem('price')}
                type="number"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Select
            labelId={`select-${name}-label`}
            id={`select-${name}-id`}
            value={currentItem.user}
            label="Choose users"
            onChange={setItem('user')}
            input={<OutlinedInput label={label} />}
          >
            {users.map((user: User, idx: number) => (
              <MenuItem key={`menuitem-user-${idx}`} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          {/* <InputLabel id={`select-${name}-inputlabel`}>Add {label}</InputLabel> */}
        </FormControl>
      </Box>
      <Button onClick={addItem}>Add item</Button>
      {err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></>}
      <ItemDisplay items={items} removeItem={removeItem} />
    </>
  );
};

// based on https://mui.com/material-ui/react-select/
