import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { ReactNode } from 'react';

const IconLink = (props: { href: string; icon: ReactNode }) => (
  <IconButton size="large" color="inherit">
    <Link to={props.href} style={{ textDecoration: 'none', color: 'white' }}>
      {props.icon}
    </Link>
  </IconButton>
);

export default IconLink;
