import React from 'react';
import { Link } from 'react-router-dom';

import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import DropDownMenu from './DropDownMenu';

const links = [
	{ href: '/bill/create', icon: <AddBusinessRoundedIcon/> },
	{ href: '/bill/view', icon: <CardMembershipRoundedIcon/> },
	{ href: '/user/mail', icon: <MailIcon/> },
	{ href: '/login', icon: <AccountCircle/> }
];

const TopNavigation = () => {

	return (
		<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static">
			<Toolbar>
			<Typography variant="h6"
				noWrap
				component="div"
				sx={{ display: { xs: 'none', sm: 'block' } }}
			>
				SplitIt
			</Typography>
			<Box sx={{ flexGrow: 1 }}/>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
				{links.map((link) => (
					<IconButton size="large" color="inherit">
						<Link to={link.href} style={{ textDecoration: 'none', color: 'white' }}>
							{ link.icon }
						</Link>
					</IconButton>
				))}

				<IconButton size="large" color="inherit">
					<Badge badgeContent={10} color="error" overlap="circular">
						<NotificationsIcon/>
					</Badge>
				</IconButton>
				<DropDownMenu/>
			</Box>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
				<IconButton size="large" color="inherit">
					<MoreIcon/>
				</IconButton>
			</Box>
			</Toolbar>
		</AppBar>
		</Box>
	);
};

export default TopNavigation;