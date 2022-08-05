import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { SimpleBillDto } from 'api';

interface BillDisplayProps {
  bill: SimpleBillDto;
}

const BillDisplay = (props: BillDisplayProps) => {
  const { bill } = props;
  const navigate = useNavigate();
  const view = () => navigate(`/bill/view/:${bill.id}`, { replace: true });

  return (
    <Grid item xs={12} sm={6} md={4} onClick={view}>
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
