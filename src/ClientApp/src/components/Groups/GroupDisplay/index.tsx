import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import GroupDisplayProps from './props';

const GroupDisplay = (props: GroupDisplayProps) => {
  const { group } = props;
  const navigate = useNavigate();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      onClick={() => navigate(`/group/view/:${group.id}`, { replace: true })}
    >
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
              {group.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {group.owner?.firstName} {group.owner?.lastName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default GroupDisplay;
