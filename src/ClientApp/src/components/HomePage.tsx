import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ButtonLink from 'components/Menu/ButtonLink';

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
          <ButtonLink href="/bill/create" name="Create a bill" />
          <ButtonLink href="/bill/view" name="View bills" />
          <ButtonLink href="/groups" name="Groups" />
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default HomePage;
