import React, { useState, Fragment } from "react";

import ProfileIntro from "../../profileLeft/ProfileIntro";
import ProfileNav from "../../ProfileNav";
import AboutNav from "./AboutNav";

import editIcon from "../../../../icons/edit.svg";
import git from "../../../../icons/git.svg";

const Github = () => {
  const [gittoggle, setGittoggle] = useState(false);
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
        <ProfileNav />
        <AboutNav navTitle="Github" />
        <div className="about-right">
          <div className="single-items flex">
            <img src={git} className="svg-img" alt="" />
            {gittoggle ? (
              <form className="form">
                <div className="form-group">
                  <input type="url" />
                </div>
                <div className="edit-delete flex">
                  <p className="text" onClick={(e) => setGittoggle(false)}>
                    Save
                  </p>
                  <p className="text" onClick={(e) => setGittoggle(false)}>
                    Cancel
                  </p>
                </div>
              </form>
            ) : (
              <Fragment>
                <p className="text">http://sabujhasansarker.me/</p>
                <img
                  src={editIcon}
                  onClick={(e) => setGittoggle(true)}
                  className="svg-img edit-icon"
                  alt=""
                />
              </Fragment>
            )}
          </div>
          <hr />
          {/* Git repos */}
          <div className="git-repos">
            <h1 className="text-center">Github Repos</h1>
            <div className="git-single flex">
              <div className="git-left">
                <h3>Repo One</h3>
                <br />
                <p className="text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores et odio vero libero ad magnam nobis dolorum pariatur
                  voluptatibus consequatur, vitae veritatis assumenda magni
                  facilis sit molestiae, mollitia debitis vel.
                </p>
              </div>
              <div className="git-right">
                <p className="btn-save">Star : 56 </p>
                <p className="btn">Watchers : 56 </p>
                <p className="btn">Forks : 56 </p>
              </div>
            </div>
            <div className="git-single flex">
              <div className="git-left">
                <h3>Repo One</h3>
                <br />
                <p className="text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores et odio vero libero ad magnam nobis dolorum pariatur
                  voluptatibus consequatur, vitae veritatis assumenda magni
                  facilis sit molestiae, mollitia debitis vel.
                </p>
              </div>
              <div className="git-right">
                <p className="btn-save">Star : 56 </p>
                <p className="btn">Watchers : 56 </p>
                <p className="btn">Forks : 56 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Github;
