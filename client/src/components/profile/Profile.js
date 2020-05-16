import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import Spnnier from "../layouts/Spnnier";
import { Route, Redirect } from "react-router-dom";

import { getprofilebyusername } from "../../action/profile";

import Notfound from "../layouts/Notfound";

import "./Profile.css";
import ProfileIntro from "./profileLeft/ProfileIntro";
import ProfileNav from "./ProfileNav";
import Posts from "../posts/Posts";

const Profile = ({
  profile: { profile, loading },
  match,
  getprofilebyusername,
  auth: { user },
}) => {
  useEffect(() => {
    getprofilebyusername(match.params.username);
  }, [getprofilebyusername]);

  const [intro, setIntro] = useState(window.innerWidth < 769 ? false : true);

  if (loading) {
    return <Spnnier />;
  }

  if (user && !user.profile) {
    return <Redirect to="/profile/create-profile" />;
  }

  if (profile === null) {
    if (user && user.username !== match.params.username) {
      return <Route exact component={Notfound} />;
    }
  }

  return (
    <div className="profile">
      <div
        className={`left ${
          window.innerWidth < 769 ? intro && "intro_open" : ""
        }`}
        style={!intro ? { width: "0px", padding: "0px" } : {}}
      >
        {intro && <ProfileIntro />}
      </div>
      {window.innerWidth < 769 && (
        <h4
          style={intro ? { marginLeft: "0px", marginLeft: "50%" } : {}}
          className="intro_toggle"
          onClick={(e) => setIntro(!intro)}
        >
          {intro ? "<" : ">"}
        </h4>
      )}
      <div
        className="right"
        style={
          window.innerWidth < 769
            ? !intro
              ? { width: "100%", marginLeft: "0px" }
              : {
                  position: "relative",
                  zIndex: "-1",
                  width: "100%",
                  marginLeft: "0px",
                }
            : {}
        }
      >
        {user.profile && (
          <Fragment>
            <ProfileNav />{" "}
            <div className="profile-container">
              <Posts />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getprofilebyusername })(Profile);
