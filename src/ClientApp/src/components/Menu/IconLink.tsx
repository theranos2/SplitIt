import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { ReactNode } from 'react';

const IconLink = (props: { href: string; icon: ReactNode }) => (
  <IconButton component={Link} to={props.href} size="large" color="inherit">
    {props.icon}
  </IconButton>
);

export default IconLink;
