import React from 'react';
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import BillComplex from '../BillComplex';
import BillSimple from '../BillSimple';

interface ViewContainerProps {
  title: string;
  description: string;
  items?: Array<any>;
}

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
            {items?.map((item) => (
              <Grid item key={`item-${item.id}`} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* TODO: an image could be nice? maybe */}
                  {/* <CardMedia component='img' sx={{ pt: '56.25%' }} image={i.tnail} alt='An image of the property'/> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography>
                      {item.type === 'simple' ? (
                        <BillSimple item={item} />
                      ) : (
                        <BillComplex item={item} />
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>{/* Menu to interact with the listing */}</CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* TODO: should stick to the bottom of the page */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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

ViewContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array
};

export default ViewContainer;

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/album/Album.js
