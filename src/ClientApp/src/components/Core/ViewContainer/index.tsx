import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import BillDisplay from 'components/BillView/BillDisplay';
import GroupDisplay from 'components/Groups/GroupDisplay';
import { BillDto, GroupDto } from 'api';

import ViewContainerProps from './props';

const ViewContainer = (props: ViewContainerProps) => {
  const { title, description, items } = props;
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 0 }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary">
              {title}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {description}
            </Typography>
            {/* <Container align='center'>Sheesh</Container> */}
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="md">
          <Grid container spacing={4}>
            {items.map((item: BillDto | GroupDto) =>
              item.ownerId ? (
                <BillDisplay key={`item-${item.id}`} bill={item} />
              ) : (
                <GroupDisplay key={`item-${item.id}`} group={item} />
              )
            )}
          </Grid>
        </Container>
      </main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 6,
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: 60,
          textAlign: 'center'
        }}
        component="footer"
      >
        <Typography variant="h6" align="center" gutterBottom>
          SplitIt:&nbsp;
          <Typography display="inline" variant="subtitle1" color="text.secondary" component="p">
            waste your life savings, and blame your friends
          </Typography>
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default ViewContainer;

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/album/Album.js
