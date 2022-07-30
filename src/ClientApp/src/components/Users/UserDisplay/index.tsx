import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { UserDisplayProps } from './props';
import { User } from '../../BillCreation/BillCreationProps';

const UserDisplay = (props: UserDisplayProps) => {
  const { users, removeUser } = props;

  return (
    <>
      {users.map((user: User, idx: number) => (
        <Card
          key={`user-display-${idx}`}
          sx={{ display: 'flex', width: '100%', paddingLeft: '10px' }}
        >
          <CardMedia
            component="img"
            sx={{ width: 70 }}
            image="/img/default-user.jpg"
            alt="user img"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
            </CardContent>
          </Box>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={() => removeUser(user)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Card>
      ))}
    </>
  );
};

// To be used in bill creation (simple/advanced), and view
// also for friends lists and stuff later on.

export default UserDisplay;
