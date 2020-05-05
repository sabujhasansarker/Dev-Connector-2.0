import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Posts from "./components/posts/Posts";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Alert from "./components/layouts/Alert";

import { loadUser } from "./action/auth";
import setAuthToken from "./utils/SetToken";
import PrivetRouter from "./components/routers/PrivetRouter";
import Deshboard from "./components/deshboard/Deshboard";
import Notfound from "./components/layouts/Notfound";

if (localStorage.usertoken) {
  setAuthToken(localStorage.usertoken);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container pt-100">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivetRouter exact path="/deshboard" component={Deshboard} />
            <PrivetRouter exact path="/" component={Posts} />
            <Route exact path="/register" component={Register} />
            <Route exact component={Notfound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
