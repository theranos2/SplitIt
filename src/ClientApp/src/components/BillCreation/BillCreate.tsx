import React from 'react';
import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const BillCreate = () => {

    return (
        <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
            <Button key="one"><Link to="/bill/simple">Create a simple bill</Link></Button>
            <Button key="one"><Link to="/bill/advanced">Create an advanced bill</Link></Button>
        </ButtonGroup>
    );
};

export default BillCreate;