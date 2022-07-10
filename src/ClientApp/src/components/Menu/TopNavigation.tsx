import { Link } from 'react-router-dom';

import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsMenu from '../Notifications/NotificationsMenu';
import IconLink from './IconLink';
import { token } from 'utility/config';

const links =
  token !== ''
    ? [
        { href: '/bill/create', icon: <AddBusinessRoundedIcon /> },
        { href: '/bill/view', icon: <CardMembershipRoundedIcon /> },
        { href: '/bill/view', icon: <CardMembershipRoundedIcon /> },
        { href: '/notifications', icon: <NotificationsIcon /> },
        // { href: 'notif', icon: <NotificationsMenu /> },
        { href: '/logout', icon: <ExitToAppIcon /> }
      ]
    : [{ href: '/login', icon: <AccountCircle /> }];

const TopNavigation = () => {
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
              link.href === 'notif' ? (
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