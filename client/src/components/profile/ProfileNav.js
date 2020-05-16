import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileNav = () => {
  const profileNull = (
    <ul>
      <li>
        <Link to="/profile/create-profile">Create Profile</Link>
      </li>
    </ul>
  );
  const profilefound = (
    <ul>
      <li>
        <Link to="/profile">Timeline</Link>
      </li>
      <li>
        <Link to="/profile/about">About</Link>
      </li>
      <li>
        <Link to="/profile/update-profile">Update Info</Link>
      </li>
      <li>
        <Link to="/profile/active-log">Active Log</Link>
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

export default ProfileNav;
