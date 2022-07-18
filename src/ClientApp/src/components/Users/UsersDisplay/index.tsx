import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { UserDisplayProps } from './props';
import { User } from '../../BillCreation/BillCreationProps';

const UsersDisplay = (props: UserDisplayProps) => {
  const { users, removeUser } = props;

  console.log(users);

  return (
    <>
      {users.map((user: User, idx: number) => (
        <Card key={`user-display-${idx}`} sx={{ display: 'flex', width: '100%' }}>
          <CardMedia
            component="img"
            sx={{ width: 70 }}
            image="/img/default-user.jpg"
            alt="user img"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {user.name}
              </Typography>
            </CardContent>
          </Box>
          <IconButton onClick={() => removeUser(user)}>
            <CloseIcon />
          </IconButton>
        </Card>
      ))}
    </>
  );
};

// To be used in bill creation (simple/advanced), and view
// also for friends lists and stuff later on.

export default UsersDisplay;
