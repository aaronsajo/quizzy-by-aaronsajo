import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Login from "components/Authentication/Login";

import { initializeLogger } from "./common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);
  // const authToken = getFromLocalStorage("authToken");
  // const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  loading;

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={() => <div>Home ALL</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
