import React from 'react';
import { Link } from 'react-router-dom';

import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import NotificationsMenu from '../Notifications/NotificationsMenu';
import IconLink from './IconLink';
import { useAuthContext } from 'utility/hooks/useAuth';

const TopNavigation = () => {
  const { token } = useAuthContext();
  const links =
    token !== ''
      ? [
          { href: '/bill/create', icon: <AddBusinessRoundedIcon /> },
          { href: '/bill/view', icon: <CardMembershipRoundedIcon /> },
          { href: '/groups', icon: <GroupsIcon /> },
          { href: '/notifications', icon: <NotificationsMenu /> },
          { href: '/logout', icon: <ExitToAppIcon /> }
        ]
      : [{ href: '/login', icon: <AccountCircle /> }];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              SplitIt
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {links.map((link, idx) =>
              link.href === '/notifications' ? (
                <NotificationsMenu key={`menu-link-${idx}`} />
              ) : (
                <IconLink key={`menu-link-${idx}`} href={link.href} icon={link.icon} />
              )
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
