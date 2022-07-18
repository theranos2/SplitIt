import React from 'react';
import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const HomePage = () => {
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
          <Button key="bill-create-home">
            <Link to="/bill/create">Create a bill</Link>
          </Button>
          <Button key="bill-view-home">
            <Link to="/bill/view">View bills</Link>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default HomePage;
