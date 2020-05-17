import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Navbar from "./components/layouts/Navbar";
// import Posts from "./components/posts/Posts";
import Alert from "./components/layouts/Alert";

import { loadUser } from "./action/auth";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routers/Routes";
import Posts from "./components/posts/Posts";
import PrivetRouter from "./components/routers/PrivetRouter";

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
        <Alert />
        <Switch>
          <PrivetRouter exact path="/" component={Posts} />
          <Route component={Routes} />
        </Switch>
        {/* <PrivetRouter exact path="/:username" component={Profile} />
          <PrivetRouter exact path="/:username/about" component={About} /> */}
      </Router>
    </Provider>
  );
};

export default App;
