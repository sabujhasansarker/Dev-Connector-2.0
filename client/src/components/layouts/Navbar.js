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
        <Link
          className="d-flex nav-user"
          to={`/${user && user.username}`}
          style={{ textTransform: "capitalize" }}
        >
          <img src={user && user.profilePic} alt="" />
          {user && user.firstName}
        </Link>
      </li>
      <li>
        <Link to="/">Posts</Link>
      </li>
      <li>
        <Link to="/setting">
          Setting <i className="fas fa-user-cog setting-icon"></i>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => logout()}>
          Logout <i className="fas fa-sign-out-alt"></i>
        </Link>
      </li>
    </Fragment>
  );
  return (
    <header>
      <div className="inner container">
        <nav>
          <Link to="/" className="logo">
            <i className="fas fa-code"></i> Logo
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
