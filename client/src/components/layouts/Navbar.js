import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../../action/auth";
import { clearProfile } from "../../action/profile";

import { getprofilebyusername } from "../../action/profile";

import "./Navbar.css";
import logo from "../../icons/main-logo.svg";
import usersetting from "../../icons/user-setting.svg";
import logoutimg from "../../icons/logout.svg";

const Navbar = ({
  auth: { isAutination, user },
  logout,
  clearProfile,
  getprofilebyusername,
  match,
}) => {
  const username = user && user.firstName;

  const gast = (
    <Fragment>
      <div className="right d-flex">
        <Link to="/">
          <img className="gest" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="left">
        <ul className="d-flex">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const auth = (
    <Fragment>
      <div className="right d-flex">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <input type="text" placeholder="Search" />
      </div>
      <div className="left">
        <ul className="d-flex">
          <li>
            <Link
              onClick={(e) => {
                clearProfile();
                getprofilebyusername(user && user.username);
              }}
              className="d-flex"
              to={`/${user && user.username}`}
              style={{ textTransform: "capitalize" }}
            >
              <img src={user && user.profilePic} className="userimage" alt="" />
              {user && username}
            </Link>
          </li>
          <li>
            <Link to="/setting" onClick={(e) => clearProfile()}>
              <img src={usersetting} alt="logo" />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                logout();
                clearProfile();
              }}
            >
              <img src={logoutimg} alt="logo" />
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      <header>
        <nav className="container d-flex">{isAutination ? auth : gast}</nav>
      </header>
      <div
        className="blackfield"
        style={isAutination ? { height: "70px" } : { height: "50px" }}
      ></div>
    </Fragment>
  );
};

const mapToStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapToStateProps, {
  logout,
  clearProfile,
  getprofilebyusername,
})(Navbar);
