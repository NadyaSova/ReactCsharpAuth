import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "../private-route";
import LoginPage from "../pages/login-page";
import NameUpdatePage from "../pages/name-update-page";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={LoginPage} exact />
      <PrivateRoute exact path="/welcome" component={NameUpdatePage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
