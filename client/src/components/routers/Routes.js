import React, { Fragment, Profiler } from "react";
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
import About from "../profile/profileRight/About/About";
import UpdateInfo from "../profile/profileRight/UpdateInfo";

import Education from "../profile/profileRight/About/Education";
import Experrience from "../profile/profileRight/About/Experrience";
import Contact from "../profile/profileRight/About/Contact";
import Github from "../profile/profileRight/About/Github";

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
        {/* <PrivetRouter
          exact
          path="/:username/create-profile"
          component={ProfileFroms}
        /> */}
        <PrivetRouter
          exact
          path="/profile/create-profile"
          component={UpdateInfo}
        />
        <PrivetRouter exact path="/profile" component={Profile} />
        <PrivetRouter exact path="/profile/about" component={About} />
        <PrivetRouter
          exact
          path="/profile/about/education"
          component={Education}
        />
        <PrivetRouter
          exact
          path="/profile/about/contact-basic"
          component={Contact}
        />
        <PrivetRouter exact path="/profile/about/github" component={Github} />
        <PrivetRouter
          exact
          path="/profile/about/experrience"
          component={Experrience}
        />
        <PrivetRouter
          exact
          path="/profile/update-profile"
          component={UpdateInfo}
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
