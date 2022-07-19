import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import BillDisplay from '../BillDisplay';

import ViewContainerProps from './props';

const ViewContainer = (props: ViewContainerProps) => {
  const { title, description, bills } = props;
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
            {bills?.map((bill) => (
              <Grid item key={`item-${bill.id}`} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* TODO: an image could be nice? maybe */}
                  {/* <CardMedia component='img' sx={{ pt: '56.25%' }} image={i.tnail} alt='An image of the property'/> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                      {bill.name}
                    </Typography> */}
                    <BillDisplay bill={bill} />
                  </CardContent>
                  {/* <CardActions>Menu to interact with the listing</CardActions> */}
                </Card>
              </Grid>
            ))}
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
