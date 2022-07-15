import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import DropDownMenu from './DropDownMenu';

const NotificationsMenu = () => (
  <>
    <Badge badgeContent={10} color="error" overlap="circular">
      <NotificationsIcon />
    </Badge>
    <DropDownMenu />
  </>
);

export default NotificationsMenu;
