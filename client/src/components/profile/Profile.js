import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";
import { Route, Link } from "react-router-dom";

import Notfound from "../layouts/Notfound";
import TimeLine from "./timeLine/TimeLine";
import { getprofilebyusername } from "../../action/profile";

const Profile = ({
  profile: { profile, loading },
  match,
  getprofilebyusername,
}) => {
  console.log(profile && profile);
  useEffect(() => {
    getprofilebyusername(match.params.username);
  }, [getprofilebyusername]);

  if (loading) {
    return <Spnnier />;
  }

  if (profile && profile.username !== match.params.username) {
    return <Route exact component={Notfound} />;
  }

  const profileFound = (
    <ul>
      <li>
        <Link to={`/${profile && profile.username}`}>TimeLine</Link>
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
  // const { profilePic } = profile && profile;
  return (
    <div className="profile">
      <div className="banner"></div>
      <img className="profile-pic" src={profile && profile.profilePic} alt="" />
      <div className="profile-menu">
        {profile ? profileFound : profileNotFound}
      </div>
      <TimeLine profile={profile && profile} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getprofilebyusername })(Profile);
