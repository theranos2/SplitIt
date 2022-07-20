import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Notification, NotificationsApi } from 'api';
import DropDownMenu from './DropDownMenu';

import data from './data.json';
import {
  Badge,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  ListItemText,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { token } from 'utility/config';

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
      const api = new NotificationsApi({ apiKey: token });
      const result = await api.apiNotificationsGet();
      const NewNotifications = result.data;
      NewNotifications && setNotifications(NewNotifications);
    })();

    // Temp test with local data
  }, [anchorEl]);

  return (
    <>
      {/* <Badge badgeContent={10} color="error" overlap="circular">
      <NotificationsIcon />
    </Badge> */}
      {/* <DropDownMenu /> */}

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
