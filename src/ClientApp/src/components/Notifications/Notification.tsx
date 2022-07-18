import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Grid, Typography, Container } from '@mui/material';
import { Notification } from 'api';

const NotificationDisplay = (props: { notification: Notification }) => {
  const { notification } = props;
  const [hovered, setHovered] = React.useState<boolean>(false);
  const linkRoute =
    notification.domain && notification.resourceId
      ? `/${notification.domain}:${notification.resourceId}`
      : '/notifications';

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Link to={linkRoute}>
        <StyledPaper
          sx={{
            my: 1,
            mx: 'auto',
            p: 2
          }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            backgroundColor: hovered ? 'LightGray' : 'white',
            cursor: hovered ? 'pointer' : 'auto'
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>{notification.id}</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>{notification.message}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Link>
    </Box>
  );
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 1000,
  color: theme.palette.text.primary
}));

export default NotificationDisplay;
