import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ButtonLink from 'components/Menu/ButtonLink';

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
          <ButtonLink href="/bill/simple" name="Create a simple bill" />
          <ButtonLink href="/bill/advanced" name="Create an advanced bill" />
          <ButtonLink href="/" name="Back" />
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default BillCreate;
