import React, { useState, Fragment } from "react";

import EducationPopup from "../../../forms/EducationPopup";

import editIcon from "../../../../icons/edit.svg";
import addIcon from "../../../../icons/add.svg";
import schoolIcon from "../../../../icons/school.svg";
import workIcon from "../../../../icons/work.svg";
import addressIcon from "../../../../icons/pin.svg";

// Social
import fb from "../../../../icons/fb.svg";
import inst from "../../../../icons/inst.svg";
import lndin from "../../../../icons/linkdin.svg";
import twtter from "../../../../icons/twitter.svg";
import utube from "../../../../icons/youtube.svg";
import git from "../../../../icons/git.svg";
import web from "../../../../icons/web.svg";

const Overview = () => {
  const [popup, setPopup] = useState(false);
  const [addresstoggle, setAddresstoggle] = useState(false);
  return (
    <div className="about-right">
      {popup && <EducationPopup />}
      {/*  Single */}
      <div className="single">
        <div className="add flex">
          <img
            src={addIcon}
            className="svg-img"
            onClick={(e) => setPopup(!popup)}
            alt=""
          />
          <h3>Add Educaion</h3>
        </div>
        <div className="single-items flex">
          <img src={schoolIcon} className="svg-img" alt="" />
          <div className="details">
            <p className="text">
              Study management at <b>oxford university</b> <br /> from 2015
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
      {/*  Single */}
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
              Work at <b>oxford university</b> as a developer <br /> from 2019
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
      <div className="single-items flex">
        <img src={addressIcon} className="svg-img" alt="" />
        {addresstoggle ? (
          <form className="form">
            <div className="form-group">
              <input type="text" />
            </div>
            <div className="edit-delete flex">
              <p className="text" onClick={(e) => setAddresstoggle(false)}>
                Save
              </p>
              <p className="text" onClick={(e) => setAddresstoggle(false)}>
                Cancel
              </p>
            </div>
          </form>
        ) : (
          <Fragment>
            <p className="text">Live in Jatrabari,Dhaka,Bangladesh</p>
            <img
              src={editIcon}
              onClick={(e) => setAddresstoggle(true)}
              className="svg-img edit-icon"
              alt=""
            />
          </Fragment>
        )}
      </div>
      <hr />
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
    </div>
  );
};

export default Overview;
