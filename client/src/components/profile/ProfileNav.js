import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProfileNav = ({ user }) => {
  const profileNull = (
    <ul>
      <li>
        <Link to={`/${user && user.username}/create-profile`}>
          Create Profile
        </Link>
      </li>
    </ul>
  );
  const profilefound = (
    <ul>
      <li>
        <Link to={`/${user && user.username}`}>Timeline</Link>
      </li>
      <li>
        <Link to={`/${user && user.username}/about`}>About</Link>
      </li>
      <li>
        <Link to={`/${user && user.username}/update-profile`}>Update Info</Link>
      </li>
      <li>
        <Link to={`/${user && user.username}/active-log`}>Active Log</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className="profile-top-nav">{profilefound}</nav>
      <div className="blank-65"></div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProfileNav);
