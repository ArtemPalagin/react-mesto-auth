import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, loggedIn, component: Component, ...props }) => {
  return (
    <Route exact path={path}>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute; 