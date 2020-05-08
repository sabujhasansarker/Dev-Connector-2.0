import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";
import { Route, Link } from "react-router-dom";

import Notfound from "../layouts/Notfound";
import TimeLine from "./timeLine/TimeLine";
import { getprofilebyusername } from "../../action/profile";
import About from "./About/About";

const Profile = ({
  profile: { profile, loading },
  match,
  getprofilebyusername,
}) => {
  useEffect(() => {
    getprofilebyusername(match.params.username);
  }, [getprofilebyusername]);

  const [toggle, setToggle] = useState({
    about: false,
    timeline: true,
    update: false,
  });

  if (loading) {
    return <Spnnier />;
  }

  if (profile && profile.username !== match.params.username) {
    return <Route exact component={Notfound} />;
  }

  const profileFound = (
    <ul>
      <li>
        <Link
          to="#timeline"
          onClick={(e) =>
            setToggle({ about: false, timeline: true, update: false })
          }
        >
          TimeLine
        </Link>
      </li>
      <li>
        <Link
          to="#about"
          onClick={(e) =>
            setToggle({ about: true, timeline: false, update: false })
          }
        >
          about
        </Link>
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
      {toggle.timeline && <TimeLine profile={profile && profile} />}
      {toggle.about && <About profile={profile && profile} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getprofilebyusername })(Profile);
