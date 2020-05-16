import React, { useState, Fragment } from "react";

import ProfileIntro from "../../profileLeft/ProfileIntro";
import ProfileNav from "../../ProfileNav";
import AboutNav from "./AboutNav";

import editIcon from "../../../../icons/edit.svg";
import addIcon from "../../../../icons/add.svg";

import mailIcon from "../../../../icons/communications.svg";
import webIcon from "../../../../icons/web.svg";
import avatarIcon from "../../../../icons/avatar.svg";

import fb from "../../../../icons/fb.svg";
import inst from "../../../../icons/inst.svg";
import lndin from "../../../../icons/linkdin.svg";
import twtter from "../../../../icons/twitter.svg";
import utube from "../../../../icons/youtube.svg";

const Contact = () => {
  const [mailToggle, setmailToggle] = useState(false);
  const [webtoggle, setWebtoggle] = useState(false);
  const [socialtoggle, setSocialtoggle] = useState(false);
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
        <AboutNav navTitle="Contact and basic info" />
        <div className="about-right">
          <div className="single-items flex">
            <img src={mailIcon} className="svg-img" alt="" />
            {mailToggle ? (
              <form className="form">
                <div className="form-group">
                  <input type="text" />
                </div>
                <div className="edit-delete flex">
                  <p className="text" onClick={(e) => setmailToggle(false)}>
                    Save
                  </p>
                  <p className="text" onClick={(e) => setmailToggle(false)}>
                    Cancel
                  </p>
                </div>
              </form>
            ) : (
              <Fragment>
                <p className="text">sabujhasnsarker@gmail.com</p>
                <img
                  src={editIcon}
                  onClick={(e) => setmailToggle(true)}
                  className="svg-img edit-icon"
                  alt=""
                />
              </Fragment>
            )}
          </div>
          {/* Web */}
          <div className="single-items  flex">
            <img src={webIcon} className="svg-img" alt="" />
            {webtoggle ? (
              <form className="form">
                <div className="form-group">
                  <input type="url" />
                </div>
                <div className="edit-delete flex">
                  <p className="text" onClick={(e) => setWebtoggle(false)}>
                    Save
                  </p>
                  <p className="text" onClick={(e) => setWebtoggle(false)}>
                    Cancel
                  </p>
                </div>
              </form>
            ) : (
              <Fragment>
                <p className="text">http://sabujhasansarker.me/</p>
                <img
                  src={editIcon}
                  onClick={(e) => setWebtoggle(true)}
                  className="svg-img edit-icon"
                  alt=""
                />
              </Fragment>
            )}
          </div>
          {/* User */}
          <div className="single-items flex">
            <img src={avatarIcon} className="svg-img" alt="" />
            <p className="text">{window.location.origin}/sabuj</p>
          </div>
          <hr />
          <div className="single">
            <div className="add flex">
              <img src={addIcon} className="svg-img" alt="" />
              <h3>Add Social</h3>
            </div>
            <div className="single-items social-input flex">
              {socialtoggle ? (
                <form className="form">
                  <div className="social">
                    <div className="form-group d-flex">
                      <img src={twtter} alt="" className="svg-img" />
                      <input type="url" placeholder="Enter your facebook url" />
                    </div>
                    <div className="form-group d-flex">
                      <img src={fb} alt="" className="svg-img" />
                      <input type="url" placeholder="Enter your facebook url" />
                    </div>
                    <div className="form-group d-flex">
                      <img src={lndin} alt="" className="svg-img" />
                      <input type="url" placeholder="Enter your facebook url" />
                    </div>
                    <div className="form-group d-flex">
                      <img src={inst} alt="" className="svg-img" />
                      <input type="url" placeholder="Enter your facebook url" />
                    </div>
                    <div className="form-group d-flex">
                      <img src={utube} alt="" className="svg-img" />
                      <input type="url" placeholder="Enter your facebook url" />
                    </div>
                  </div>
                  <div className="edit-delete flex m-l-55">
                    <p className="text" onClick={(e) => setSocialtoggle(false)}>
                      Save
                    </p>
                    <p className="text" onClick={(e) => setSocialtoggle(false)}>
                      Cancel
                    </p>
                  </div>
                </form>
              ) : (
                <Fragment>
                  <div className="single-items">
                    <div className="social-icons">
                      <ul className="flex">
                        <li>
                          <a href="" target="_blank">
                            <img src={fb} className="svg-img" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="" target="_blank">
                            <img src={inst} className="svg-img" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="" target="_blank">
                            <img src={lndin} className="svg-img" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="" target="_blank">
                            <img src={twtter} className="svg-img" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="" target="_blank">
                            <img src={utube} className="svg-img" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="" target="_blank">
                            <img src={fb} className="svg-img" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <img
                    src={editIcon}
                    onClick={(e) => setSocialtoggle(true)}
                    className="svg-img edit-icon"
                    alt=""
                  />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
