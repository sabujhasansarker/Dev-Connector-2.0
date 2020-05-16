import React, { useState } from "react";

import ProfileIntro from "../../profileLeft/ProfileIntro";
import ProfileNav from "../../ProfileNav";
import AboutNav from "./AboutNav";

import ExperiencePopup from "../../../forms/ExperiencePopup";

import addIcon from "../../../../icons/add.svg";
import workIcon from "../../../../icons/work.svg";

const Experrience = () => {
  const [popup, setPopup] = useState(false);
  const [intro, setIntro] = useState(window.innerWidth < 769 ? false : true);

  return (
    <div className="profile">
      {popup && <ExperiencePopup />}
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
        <ProfileNav />
        <AboutNav navTitle="Experrience" />
        <div className="about-right">
          <div className="single">
            <div className="add flex">
              <img
                src={addIcon}
                className="svg-img"
                onClick={(e) => setPopup(!popup)}
                alt=""
              />
              <h3>Add Experrience</h3>
            </div>
            <div className="single-items flex">
              <img src={workIcon} className="svg-img" alt="" />
              <div className="details">
                <p className="text">
                  Work at <b>oxford university</b> as a developer <br /> from
                  2019
                </p>
                <div className="flex edit-delete">
                  <p className="text" onClick={(e) => setPopup(!popup)}>
                    Edit
                  </p>
                  <p className="text">Delete</p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experrience;
