import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Grid, Typography } from '@mui/material';
import { Notification } from 'api';

const NotificationDisplay = (props: { notification: Notification }) => {
  const { notification } = props;
  const [hovered, setHovered] = useState<boolean>(false);
  const [currDate, setCurrDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const linkRoute =
    notification.domain && notification.resourceId
      ? `/${notification.domain}/${notification.resourceId}`
      : '/notifications';

  return (
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
          backgroundColor: hovered ? 'LightGray' : 'white',
          cursor: hovered ? 'pointer' : 'auto'
        }}
      >
        <Link to={linkRoute} style={{ textDecoration: 'none' }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>U</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap variant="body1" color={'black'}>
                {notification.message}
              </Typography>
              <Typography noWrap variant="caption" color={'#2196f3'} fontWeight={'bold'}>
                {getNotifAge(notification?.createdAt?.toLocaleString(), currDate)}
              </Typography>
            </Grid>
          </Grid>
        </Link>
      </StyledPaper>
    </Box>
  );
};

const getNotifAge = (notifDate: string | undefined, now: Date): string => {
  if (!notifDate) return 'no date';

  const s: Date = new Date(notifDate);

  console.log(typeof now);
  console.log(typeof s);

  let age = now.getFullYear() - s.getFullYear();
  let timeUnit = 'year(s)';
  if (age < 1) {
    age = now.getMonth() - s.getMonth();
    timeUnit = 'month(s)';
  }
  if (age < 1) {
    age = now.getDate() - s.getDate();
    timeUnit = 'day(s)';
  }
  if (age < 1) {
    age = now.getMinutes() - s.getMinutes();
    timeUnit = 'minute(s)';
  }
  if (age < 1) {
    age = now.getSeconds() - s.getSeconds();
    timeUnit = 'second(s)';
  }
  return `${age} ${timeUnit} ago`;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 1000,
  color: theme.palette.text.primary
}));

export default NotificationDisplay;
