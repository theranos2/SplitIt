import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const ButtonLink = (props: { href: string; name: string }) => (
  <Button component={Link} to={props.href} size="large" color="inherit">
    {props.name}
  </Button>
);

export default ButtonLink;
