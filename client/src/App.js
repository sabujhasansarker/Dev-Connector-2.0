import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Posts from "./components/posts/Posts";
import Alert from "./components/layouts/Alert";

import { loadUser } from "./action/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivetRouter from "./components/routers/PrivetRouter";
import Routes from "./components/routers/Routes";

if (localStorage.usertoken) {
  setAuthToken(localStorage.usertoken);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container pt-100">
          <Alert />
          <Switch>
            <PrivetRouter exact path="/" component={Posts} />
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
