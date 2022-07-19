import React from 'react';
import fs from 'fs';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface BillDisplayProps {
  bill: any;
}

const BillDisplay = (props: BillDisplayProps) => {
  const { bill } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`/img/lizards/lizard${Math.floor(Math.random() * 7)}.jpg`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {bill.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            ${bill.price}.00
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BillDisplay;
