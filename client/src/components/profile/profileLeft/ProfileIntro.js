import React, { useState, Fragment } from "react";

import editicon from "../../../icons/edit.svg";
import skillIcon from "../../../icons/skills.svg";
import educationIcon from "../../../icons/school.svg";
import companyIcon from "../../../icons/company.svg";
import bioIcon from "../../../icons/bio.svg";
import workIcon from "../../../icons/work.svg";

// Social
import fb from "../../../icons/fb.svg";
import inst from "../../../icons/inst.svg";
import lndin from "../../../icons/linkdin.svg";
import twtter from "../../../icons/twitter.svg";
import utube from "../../../icons/youtube.svg";
import git from "../../../icons/git.svg";
import web from "../../../icons/web.svg";

const ProfileIntro = () => {
  const [skilltoggle, setSkilltoggle] = useState(false);
  const [commpanytoggle, setCommpanytoggle] = useState(false);
  const [biotoggle, setBiotoggle] = useState(false);

  return (
    <div className="intro">
      <div className="header">
        <div className="file-input">
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="file-input__input"
          />
          <label className="file-input__label" htmlFor="file-input">
            <img src={editicon} className="svg-img" alt="" />
          </label>
        </div>
        <img
          className="profile-pic"
          src="/uploads/2017-03-20-18-36-07-721.jpg"
          alt=""
        />
        <h2 className="text-center">Sabuj Hasan Sarker</h2>
      </div>
      <div className="skills flex">
        <img src={skillIcon} className="svg-img" alt="" />
        {skilltoggle ? (
          <form className="form">
            <div className="form-group">
              <input type="text" />
            </div>
            <div className="text">
              <p onClick={(e) => setSkilltoggle(false)}>Save</p>
              <p onClick={(e) => setSkilltoggle(false)}>Cancel</p>
            </div>
          </form>
        ) : (
          <Fragment>
            <p className="text">Html,css,nodejs,reactjs,js,wp</p>
            <img
              onClick={(e) => setSkilltoggle(true)}
              src={editicon}
              className="svg-img edit-icon"
              alt=""
            />
          </Fragment>
        )}
      </div>
      <div className="company flex">
        <img src={companyIcon} className="svg-img" alt="" />
        {commpanytoggle ? (
          <form className="form">
            <div className="form-group">
              <input type="text" />
            </div>
            <div className="text">
              <p onClick={(e) => setCommpanytoggle(false)}>Save</p>
              <p onClick={(e) => setCommpanytoggle(false)}>Cancel</p>
            </div>
          </form>
        ) : (
          <Fragment>
            <p className="text">Esoft company</p>
            <img
              onClick={(e) => setCommpanytoggle(true)}
              src={editicon}
              className="svg-img edit-icon"
              alt=""
            />
          </Fragment>
        )}
      </div>
      <div className="bio flex">
        <img src={bioIcon} className="svg-img" alt="" />
        {biotoggle ? (
          <form className="form">
            <div className="form-group">
              <textarea type="text" />
            </div>
            <div className="text">
              <p onClick={(e) => setBiotoggle(false)}>Save</p>
              <p onClick={(e) => setBiotoggle(false)}>Cancel</p>
            </div>
          </form>
        ) : (
          <Fragment>
            <p className="text">
              or lipsum as it is sometimes known, is dummy text used in laying
              out print
            </p>
            <img
              onClick={(e) => setBiotoggle(true)}
              src={editicon}
              className="svg-img edit-icon"
              alt=""
            />
          </Fragment>
        )}
      </div>
      <div className="education flex">
        <img src={educationIcon} className="svg-img" alt="" />
        <p className="text">
          Study management at <b>oxford university</b> from 2015
        </p>
      </div>
      <div className="work flex">
        <img src={workIcon} className="svg-img" alt="" />
        <p className="text">
          Work at <b>oxford university</b> as a developer from 2019
        </p>
      </div>
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
          <li>
            <a href="" target="_blank">
              <img src={git} className="svg-img" alt="" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <img src={web} className="svg-img" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileIntro;
