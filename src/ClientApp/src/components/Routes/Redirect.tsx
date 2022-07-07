import { Route, Navigate } from 'react-router-dom';

const Redirect = (props: { path: string; to: string }) => (
  <Route path={props.path}>
    <Navigate to={props.to} />
  </Route>
);

export default Redirect;
