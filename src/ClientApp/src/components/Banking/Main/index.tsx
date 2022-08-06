import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ButtonLink from 'components/Menu/ButtonLink';

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
          <ButtonLink href="/banking/card/add" name="Add a bank card" />
          <ButtonLink href="/banking/card" name="View card" />
          <ButtonLink href="/banking/address/add" name="Add address" />
          <ButtonLink href="/" name="Back" />
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
