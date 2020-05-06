import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivetRouter from "./PrivetRouter";
import Notfound from "../layouts/Notfound";
import Settings from "../layouts/Settings";

import Login from "../users/Login";
import Register from "../users/Register";
import { connect } from "react-redux";
import Profile from "../profile/Profile";

const Routes = ({ loading }) => {
  return (
    <Switch>
      {!loading && <PrivetRouter exact path="/setting" component={Settings} />}
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivetRouter exact path="/:username" component={Profile} />
      <Route exact component={Notfound} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Routes);
