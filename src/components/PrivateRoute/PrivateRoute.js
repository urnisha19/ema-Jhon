import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);//to check authenticated user or not

  return (
    <Route {...rest} s
      render={
        ({ location }) =>
          loggedInUser.email ?
            (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
      }
    />
  );
};

export default PrivateRoute;