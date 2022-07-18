import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { ItemSelectorProps } from './props';
import { Item } from '../InputFormProps';

export const ItemSelector = (props: ItemSelectorProps) => {
  const { name, label, items, setItems, err } = props;

  const [currentItem, setCurrentItem] = React.useState<Item>({
    name: '',
    id: 0,
    price: 0,
    user: 0
  });

  const setItem = (event: any) => setCurrentItem((old) => ({ ...old, [name]: event.target.value }));

  const submit = (event: any) => {
    event.preventDefault();
    setItems((old: Item[]) => [...old, currentItem]);
    cancel();
  };

  const cancel = () => {
    setCurrentItem(() => {
      return { name: '', id: 0, price: 0, user: 0 };
    });
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
            value={items}
            label="Choose users"
            onChange={setItem}
            input={<OutlinedInput label={label} />}
          >
            {items.map((item: Item, idx: number) => (
              <MenuItem key={`menuitem-item-${idx}`} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={cancel}>Close</Button>
      <Button onClick={submit}>Confirm</Button>
      {err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></>}
    </div>
  );
};

// based on https://mui.com/material-ui/react-select/
