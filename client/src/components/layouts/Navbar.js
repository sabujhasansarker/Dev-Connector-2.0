import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../../action/auth";

const Navbar = ({ auth: { isAutination, user }, logout }) => {
  const gustuser = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  );
  const loginUser = (
    <Fragment>
      <li>
        <Link to="/user_name" style={{ textTransform: "capitalize" }}>
          {user && user.firstName + " " + user.lastName}
        </Link>
      </li>
      <li>
        <Link to="/">Posts</Link>
      </li>
      <li>
        <Link to="/" onClick={() => logout()}>
          Logout
        </Link>
      </li>
      <li>
        <Link to="/setting">usersetting</Link>
      </li>
    </Fragment>
  );
  return (
    <header>
      <div className="inner container">
        <nav>
          <Link to="/" className="logo">
            Logo
          </Link>
          <input type="checkbox" name="" id="nav" />{" "}
          <label htmlFor="nav"></label>
          <ul>{isAutination ? loginUser : gustuser}</ul>
        </nav>
      </div>
    </header>
  );
};

const mapToStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapToStateProps, { logout })(Navbar);
