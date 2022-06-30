import React from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

interface notification {
	title: string
};

const DropDownMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	const notifications : Array<notification> = [{title: 'yo'}];

	return (
		<Paper sx={{ width: 320 }}>
			<MenuList dense>
				<MenuItem>
					<ListItemText>Single</ListItemText>
				</MenuItem>
			</MenuList>
		</Paper>
  	);
}

export default DropDownMenu;

// https://mui.com/material-ui/react-menu/