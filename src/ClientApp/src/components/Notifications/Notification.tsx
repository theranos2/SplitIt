import React from 'react';
import Notification from './NotificationProps';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Grid, Typography, Container } from '@mui/material';

interface Clicked {
  (n: Notification): void;
}

interface NotificationProps {
  notification: Notification;
  clicked: Clicked;
}

const NotificationDisplay = (props: NotificationProps) => {
  const { notification, clicked } = props;
  const [hovered, setHovered] = React.useState<boolean>(false);

  return (
    <Container onClick={() => clicked(notification)}>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
          sx={{
            my: 1,
            mx: 'auto',
            p: 2
          }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            backgroundColor: hovered ? 'LightGray' : notification.seen ? '#cbdaf5' : 'white',
            cursor: hovered ? 'pointer' : 'auto'
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>U{notification.id}</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>{notification.content}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Container>
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
