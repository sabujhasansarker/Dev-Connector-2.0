import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import PrivetRouter from "./PrivetRouter";
import Notfound from "../layouts/Notfound";

// User
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import UserFrom from "../forms/UserForm";

import { connect } from "react-redux";
import Profile from "../profile/Profile";
import ProfileFroms from "../profile/profileFroms/ProfileFroms";

const Routes = ({ auth: { loading, user } }) => {
  return (
    <Fragment>
      <Switch>
        {!loading && (
          <PrivetRouter exact path="/setting" component={UserFrom} />
        )}
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
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
