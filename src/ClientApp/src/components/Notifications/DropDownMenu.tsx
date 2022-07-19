import React from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Notification } from 'api';

import data from './data.json';
import {
  Badge,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  ListItemText,
  IconButton,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

interface DropDownMenuProps {
  notifications: Notification[];
  anchorEl: Element | null;
  open: boolean;
  handleClose: Function;
}

const DropDownMenu = (props: DropDownMenuProps) => {
  const { notifications, anchorEl, open, handleClose } = props;

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      PaperProps={{
        style: {
          width: 300
        }
      }}
    >
      <MenuItem onClick={() => handleClose()} style={{ justifyContent: 'space-between' }}>
        <Typography noWrap variant="h5" color={'black'} fontWeight={'bold'}>
          Notifications
        </Typography>
        <Link to={`/notifications`} style={{ textDecoration: 'none' }}>
          <Typography noWrap variant="body1" fontWeight={'bold'}>
            see all
          </Typography>
        </Link>
      </MenuItem>
      {notifications.map((n: Notification, idx: number) => (
        <MenuItem key={`notification-${idx}`} onClick={() => handleClose()}>
          <Link to={`/${n.domain}/${n.resourceId}`} style={{ textDecoration: 'none' }}>
            {n.message}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropDownMenu;

// https://mui.com/material-ui/react-menu/
