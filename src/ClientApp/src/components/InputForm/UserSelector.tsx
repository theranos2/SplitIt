import React from 'react';

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

interface ErrorType {
    cond: boolean,
    msg: string
}

interface UserSelectorProps {
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

export const UserSelector = (props: UserSelectorProps) => {
    const { name, label, inputs, set, err } = props;
    let users : User[] = [
        { name: 'Adam', id: 1 },
        { name: 'Ken', id: 2 },
        { name: 'Razin', id: 3 },
        { name: 'Lachlan', id: 4 },
        { name: 'Xibo', id: 5 },
    ];

    const [open, setOpen] = React.useState(false);

    const openModal = () => setOpen(true);

    const closeModal = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        (reason !== 'backdropClick') && setOpen(false);
    };

    React.useEffect(() => {
        const getUsers = () => {
            // users = 
            // await request('/api/users/')
                // .then((res) => res.users)
                // .then
        }
        
        getUsers();
        // console.log(users);
    });

    return (
        <div>
            <Button onClick={openModal}>Add/Remove {label}</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={closeModal}>
                <DialogTitle>Add {label}</DialogTitle>
                <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`select-${name}-inputlabel`}>{label}</InputLabel>
                    <Select
                        labelId={`select-${name}-label`}
                        id={`select-${name}-id`}
                        value={inputs[name]}
                        onChange={set(name)}
                        input={<OutlinedInput label={label}/>}
                    >
                    {
                        users.filter((user) => inputs[name].includes(user.id) === false).map((user) =>
                            <MenuItem value={user.id}>{user.name}</MenuItem>)
                    }
                    </Select>
                    </FormControl>
                    {
                        inputs[name].map((user : User) => <a>{user.name}</a>)
                    }
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={closeModal}>Close</Button>
                {/* <Button onClick={closeModal}>Confirm</Button> */}
                </DialogActions>
            </Dialog>
            { err.cond ? <Alert severity="warning">{err.msg}</Alert> : <></> }
        </div>
    );
};

// based on https://mui.com/material-ui/react-select/