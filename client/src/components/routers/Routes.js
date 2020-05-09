import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import PrivetRouter from "./PrivetRouter";
import Notfound from "../layouts/Notfound";
import Settings from "../layouts/Settings";

import Login from "../users/Login";
import Register from "../users/Register";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import ProfileFroms from "../profile/profileFroms/ProfileFroms";

const Routes = ({ auth: { loading, user } }) => {
  return (
    <Fragment>
      <Switch>
        {!loading && (
          <PrivetRouter exact path="/setting" component={Settings} />
        )}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivetRouter exact path="/:username" component={Profile} />
        <PrivetRouter
          exact
          path="/:username/create-profile"
          component={ProfileFroms}
        />
        <Route exact component={Notfound} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
