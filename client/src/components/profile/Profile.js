import React from "react";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";
import { Route, Link } from "react-router-dom";
import Notfound from "../layouts/Notfound";
import TimeLine from "./timeLine/TimeLine";

const Profile = ({ auth: { loading, user }, match }) => {
  if (loading) {
    return <Spnnier />;
  }

  if (user && user.username !== match.params.username) {
    return <Route exact component={Notfound} />;
  }
  const profileFound = (
    <ul>
      <li>
        <Link to={`/${user && user.username}`}>TimeLine</Link>
      </li>
      <li>
        <a href="">About</a>
      </li>
      <li>
        <a href="">update info</a>
      </li>
      <li>
        <a href="">active log</a>
      </li>
    </ul>
  );
  const profileNotFound = (
    <ul>
      <li>
        <a href="">Complte Your Profile</a>
      </li>
    </ul>
  );
  const { profilePic, profile } = user && user;
  return (
    <div className="profile">
      <div className="banner"></div>
      <img className="profile-pic" src={profilePic} alt="" />
      <div className="profile-menu">
        {profile ? profileFound : profileNotFound}
      </div>
      <TimeLine profile={profile} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
