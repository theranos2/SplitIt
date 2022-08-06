import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export function BankingIndex() {
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
          <Button key="card-add-btn">
            <Link to="/banking/card/add">Add a bank card</Link>
          </Button>
          <Button key="card-view-btn">
            <Link to="/banking/card">View card</Link>
          </Button>
          <Button key="addr-add-btn">
            <Link to="/banking/address/add">Add address</Link>
          </Button>
          <Button key="home-btn">
            <Link to="/">Back</Link>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
