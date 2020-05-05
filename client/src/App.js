import React from "react";
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container pt-100">
          <Alert />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
