import React from 'react';
import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const BillCreate = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
          <Button key="one">
            <Link to="/bill/simple">Create a simple bill</Link>
          </Button>
          <Button key="one">
            <Link to="/bill/advanced">Create an advanced bill</Link>
          </Button>
          <Button key="one">
            <Link to="/">Back</Link>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default BillCreate;
