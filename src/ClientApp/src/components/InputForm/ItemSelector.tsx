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


interface ErrorType {
    cond: boolean,
    msg: string
}

interface ItemSelectorProps {
    name: string, 
    label: string,
    inputs: Record<string, any>, 
    set: Function, 
    err: ErrorType
}

interface User {
    name: string,
    id: number
};

export const ItemSelector = (props: ItemSelectorProps) => {
    const { name, label, inputs, set, err } = props;

    const [currentItem, setCurrentItem] = React.useState({ name: '', price: 0, user: 0 });
    const setUser = (event: any) => setCurrentItem((old) => ({ ...old, user: event.target.value }));
    const submit = () => {
        set(name)(currentItem);
        cancel();
    }
    const cancel = () => {
        setCurrentItem(() => {return {name: '', price: 0, user: 0 }});
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const openModal = () => setOpen(true);
    const closeModal = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        (reason !== 'backdropClick') && setOpen(false);
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
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        id="outlined-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{shrink: true}}
                    />
                    <InputLabel id={`select-${name}-inputlabel`}>Add {label}</InputLabel>
                    <Select
                        labelId={`select-${name}-label`}
                        id={`select-${name}-id`}
                        value={inputs['users']}
                        label="Choose users"
                        onChange={setUser}
                        input={<OutlinedInput label={label}/>}
                    >
                    {
                        inputs['users'].map((user : User) =>
                            <MenuItem value={user.id}>{user.name}</MenuItem>)
                    }
                    </Select>
                    </FormControl>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={cancel}>Close</Button>
                <Button onClick={submit}>Confirm</Button>
                </DialogActions>
            </Dialog>
            { err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></> }
        </div>
    );
};

// based on https://mui.com/material-ui/react-select/