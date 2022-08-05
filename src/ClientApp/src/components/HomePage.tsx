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
          <Button key="bill-create-btn">
            <Link to="/bill/create">Create a bill</Link>
          </Button>
          <Button key="bill-view-btn">
            <Link to="/bill/view">View bills</Link>
          </Button>
          <Button key="groups-btn">
            <Link to="/groups">Groups</Link>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default HomePage;
