import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Notification, NotificationsApi } from 'api';
import DropDownMenu from './DropDownMenu';

import { Badge, IconButton } from '@mui/material';

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    (async () => {
      const api = new NotificationsApi({ apiKey: window.localStorage.getItem('token') ?? '' });
      const result = await api.apiNotificationsGet();
      const NewNotifications = result.data;
      NewNotifications && setNotifications(NewNotifications);
    })();

    // Temp test with local data
  }, [anchorEl]);

  return (
    <>
      <Badge badgeContent={notifications.length} color="error" overlap="circular">
        <IconButton
          size="large"
          color="inherit"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <NotificationsIcon style={{ color: 'white' }} />
        </IconButton>
      </Badge>
      <DropDownMenu
        notifications={notifications}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default NotificationsMenu;
