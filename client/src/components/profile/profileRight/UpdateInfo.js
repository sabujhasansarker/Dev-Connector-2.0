import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import ProfileForm from "../../forms/ProfileForm";
import ProfileNav from "../ProfileNav";
import ProfileIntro from "../profileLeft/ProfileIntro";

const UpdateInfo = ({ auth: { user } }) => {
  const [intro, setIntro] = useState(window.innerWidth < 769 ? false : true);
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
        {user && user.profile && <ProfileNav />}
        <div className="profile-container">
          <ProfileForm name={user && user.profile ? "Update" : "Create"} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(UpdateInfo);
