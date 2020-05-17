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

// Page
import About from "./profileRight/About/About";
import ProfileForm from "../forms/ProfileForm";
import Education from "./profileRight/About/Education";

// Popup
import EducationPopup from "../forms/EducationPopup";
import ExperiencePopup from "../forms/ExperiencePopup";
import Experrience from "./profileRight/About/Experrience";
import Contact from "./profileRight/About/Contact";
import Github from "./profileRight/About/Github";

const Profile = ({
  profile: { profile, loading },
  match,
  getprofilebyusername,
  popup,
  auth,
}) => {
  useEffect(() => {
    getprofilebyusername(match.params.username);
  }, [getprofilebyusername]);

  const [intro, setIntro] = useState(window.innerWidth < 769 ? false : true);
  const { user } = auth && auth;
  if (loading) {
    return <Spnnier />;
  }

  if (profile === null) {
    if (user && user.username !== match.params.username) {
      return <Route exact component={Notfound} />;
    }
  }
  return (
    <div className="profile">
      {popup && popup.edu && <EducationPopup />}
      {popup && popup.exp && <ExperiencePopup />}
      <div
        className={`left ${
          window.innerWidth < 769 ? intro && "intro_open" : ""
        }`}
        style={!intro ? { width: "0px", padding: "0px" } : {}}
      >
        {intro && <ProfileIntro profile={profile && profile} user={user} />}
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
        {user && !user.profile && !profile ? (
          <Fragment>
            <ProfileForm
              profile={profile && profile}
              username={match.params.username}
            />
          </Fragment>
        ) : (
          <Fragment>
            <ProfileNav username={match.params.username} />
            <div className="profile-container">
              {window.location.pathname === `/${match.params.username}` && (
                <Posts />
              )}
              {window.location.pathname ===
                `/${match.params.username}/about` && (
                <About profile={profile && profile} />
              )}

              {window.location.pathname ===
                `/${match.params.username}/about/education` && (
                <Education profile={profile && profile} />
              )}
              {window.location.pathname ===
                `/${match.params.username}/about/experrience` && (
                <Experrience profile={profile && profile} />
              )}
              {window.location.pathname ===
                `/${match.params.username}/about/contact-basic` && (
                <Contact profile={profile && profile} />
              )}
              {window.location.pathname ===
                `/${match.params.username}/about/github` && (
                <Github profile={profile && profile} username={user} />
              )}
              {window.location.pathname ===
                `/${match.params.username}/update-profile` && (
                <ProfileForm
                  profile={profile && profile}
                  username={match.params.username}
                />
              )}
              {window.location.pathname ===
                `/${match.params.username}/create-profile` && !profile ? (
                <ProfileForm
                  profile={profile && profile}
                  username={match.params.username}
                />
              ) : (
                <Redirect to={`/${match.params.username}`} />
              )}
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
  popup: state.popup,
});

export default connect(mapStateToProps, { getprofilebyusername })(Profile);
