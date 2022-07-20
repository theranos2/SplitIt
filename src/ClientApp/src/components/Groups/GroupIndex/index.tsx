import React from 'react';
import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const GroupIndex = () => {
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
            <Link to="/groups/create">Create a group</Link>
          </Button>
          <Button key="one">
            <Link to="/groups/view">View groups</Link>
          </Button>
          <Button key="one">
            <Link to="/">Back</Link>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default GroupIndex;
