import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import PrivetRouter from "./PrivetRouter";
import Notfound from "../layouts/Notfound";

// User
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import UserFrom from "../forms/UserForm";

// Profile
import Profile from "../profile/Profile";
import SinglePage from "../posts/SinglePage";

const Routes = ({ auth: { loading, user }, profile }) => {
  return (
    <Fragment>
      <Switch>
        {!loading && (
          <PrivetRouter exact path="/setting" component={UserFrom} />
        )}
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <PrivetRouter exact path="/:username" component={Profile} />
        <PrivetRouter exact path="/post/:postId" component={SinglePage} />
        <PrivetRouter
          exact
          path="/:username/profile-setting"
          component={Profile}
        />
        <PrivetRouter exact path="/:username/about" component={Profile} />
        <PrivetRouter
          exact
          path="/:username/about/education"
          component={Profile}
        />
        <PrivetRouter
          exact
          path="/:username/about/contact-basic"
          component={Profile}
        />
        <PrivetRouter
          exact
          path="/:username/about/github"
          component={Profile}
        />
        <PrivetRouter
          exact
          path="/:username/about/experrience"
          component={Profile}
        />

        <Route exact component={Notfound} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps)(Routes);
