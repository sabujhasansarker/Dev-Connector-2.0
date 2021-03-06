import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProfileNav = ({ user, username }) => {
  const profileNull = (
    <ul>
      <li>
        <Link to={`/${username && username}/create-profile`}>
          Create Profile
        </Link>
      </li>
    </ul>
  );
  const profilefound = (
    <ul>
      <li>
        <Link to={`/${username && username}`}>Timeline</Link>
      </li>
      <li>
        <Link to={`/${username && username}/about`}>About</Link>
      </li>
      {user && user.username === username && username && (
        <Fragment>
          <li>
            <Link to={`/${username && username}/profile-setting`}>
              Update Info
            </Link>
          </li>
        </Fragment>
      )}
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
