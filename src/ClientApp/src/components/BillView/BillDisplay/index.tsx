import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { Context } from 'utility/Context';

import { SimpleBillDto } from 'api';

interface BillDisplayProps {
  bill: SimpleBillDto;
}

const BillDisplay = (props: BillDisplayProps) => {
  const { bill } = props;
  const history = React.useContext(Context)?.history;
  const navigate = () => history(`/bill/view/:${bill.id}`, { replace: true });

  return (
    <Grid item xs={12} sm={6} md={4} onClick={navigate}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`/img/lizards/lizard${Math.floor(Math.random() * 7)}.jpg`}
            alt="green iguana"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {bill.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              ${bill.total}.00
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default BillDisplay;
