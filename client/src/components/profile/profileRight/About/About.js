import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProfileIntro from "../../profileLeft/ProfileIntro";
import ProfileNav from "../../ProfileNav";
import AboutNav from "./AboutNav";
import Overview from "./Overview";

import { getprofilebyusername } from "../../../../action/profile";
import Spnnier from "../../../layouts/Spnnier";

const About = ({
  match,
  getprofilebyusername,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getprofilebyusername(match.params.username);
  }, [getprofilebyusername]);
  const [intro, setIntro] = useState(window.innerWidth < 769 ? false : true);

  if (loading) {
    return <Spnnier />;
  }

  return (
    <div className="profile">
      <div
        className={`left ${
          window.innerWidth < 769 ? intro && "intro_open" : ""
        }`}
        style={!intro ? { width: "0px", padding: "0px" } : {}}
      >
        {intro && <ProfileIntro profile={profile && profile} />}
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
        <ProfileNav username={match.params.username} />
        <AboutNav navTitle="OverView" username={match.params.username} />
        <Overview profile={profile} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getprofilebyusername,
})(About);
