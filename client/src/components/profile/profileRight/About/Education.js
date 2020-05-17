import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import addIcon from "../../../../icons/add.svg";
import schoolIcon from "../../../../icons/school.svg";

import AboutNav from "./AboutNav";

// funtion
import { setPopup } from "../../../../action/popup";
import { getCurrent, deleteEducaion } from "../../../../action/profile";

const Education = ({ user, profile, getCurrent, deleteEducaion, setPopup }) => {
  let { education, username } = profile ? profile : "";

  return (
    <Fragment>
      <AboutNav navTitle="Education" username={profile && profile.username} />
      <div className="about-right">
        <div className="single">
          {username === user.username && (
            <div className="add flex">
              <img
                src={addIcon}
                className="svg-img"
                onClick={(e) => setPopup({ edu: true })}
                alt=""
              />
              <h3>Add Educaion</h3>
            </div>
          )}
          {education.map((edu) => (
            <Fragment key={edu._id}>
              <div className="single-items flex">
                <img src={schoolIcon} className="svg-img" alt="" />
                <div className="details">
                  <p className="text">
                    Study {edu.fieldofstudy} at <b>{edu.school}</b> <br /> from{" "}
                    <Moment format="YYYY">{edu.from}</Moment>
                    {edu.to && (
                      <Fragment>
                        {" "}
                        to <Moment format="YYYY">{edu.to}</Moment>
                      </Fragment>
                    )}
                  </p>
                  {username === user.username && (
                    <div className="flex edit-delete">
                      <p
                        className="text"
                        onClick={(e) => {
                          setPopup({ edu: true });
                          getCurrent({ edu: edu });
                        }}
                      >
                        Edit
                      </p>
                      <p
                        className="text"
                        onClick={(e) => deleteEducaion(edu._id)}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          ))}

          <hr />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  setPopup,
  deleteEducaion,
  getCurrent,
})(Education);
