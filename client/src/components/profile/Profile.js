import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";
import { Route, Link } from "react-router-dom";

import Notfound from "../layouts/Notfound";
import TimeLine from "./timeLine/TimeLine";
import { getprofilebyusername } from "../../action/profile";
import About from "./About/About";
import ProfileFroms from "./profileFroms/ProfileFroms";

const Profile = ({
  profile: { profile, loading },
  match,
  getprofilebyusername,
  auth: { user },
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
        <Link
          to="#update_info"
          onClick={(e) =>
            setToggle({ about: false, timeline: false, update: true })
          }
        >
          update info
        </Link>
      </li>
      <li>
        <a href="">active log</a>
      </li>
    </ul>
  );
  const profileNotFound = (
    <ul>
      <li>
        <Link to={`/${user && user.username}/create-profile`}>
          Create Your Profile
        </Link>
      </li>
    </ul>
  );
  // const { profilePic } = profile && profile;
  return (
    <div className="profile">
      <div className="banner"></div>
      <img
        className="profile-pic"
        src={profile ? profile && profile.profilePic : user && user.profilePic}
        alt=""
      />
      <div className="profile-menu">
        {profile ? profileFound : profileNotFound}
      </div>
      {profile ? (
        <Fragment>
          {toggle.timeline && <TimeLine profile={profile && profile} />}
          {toggle.about && (
            <About user={user && user} profile={profile && profile} />
          )}
          {toggle.update && <ProfileFroms profile={profile && profile} />}
        </Fragment>
      ) : (
        <h1 className="text-center">No Profile Found Create Your profile</h1>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getprofilebyusername })(Profile);
