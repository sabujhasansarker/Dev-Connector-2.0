import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import AboutNav from "./AboutNav";

import addIcon from "../../../../icons/add.svg";
import workIcon from "../../../../icons/work.svg";

// funtion
import { setPopup } from "../../../../action/popup";
import { getCurrent, deleteExperience } from "../../../../action/profile";

const Experrience = ({
  user,
  profile,
  getCurrent,
  setPopup,
  deleteExperience,
}) => {
  let { experience, username } = profile ? profile : "";

  return (
    <Fragment>
      <AboutNav navTitle="Experrience" />
      <div className="about-right">
        <div className="single">
          {username === user.username && (
            <div className="add flex">
              <img
                src={addIcon}
                className="svg-img"
                onClick={(e) => setPopup({ exp: true })}
                alt=""
              />
              <h3>Add Experrience</h3>
            </div>
          )}
          {experience.map((exp) => (
            <Fragment key={exp._id}>
              <div className="single-items flex">
                <img src={workIcon} className="svg-img" alt="" />
                <div className="details">
                  <p className="text">
                    Work at <b>{exp.company}</b> as a {exp.title} <br /> from{" "}
                    <Moment format="YYYY">{exp.from}</Moment>{" "}
                    {exp.to && (
                      <Fragment>
                        {" "}
                        to <Moment format="YYYY">{exp.to}</Moment>
                      </Fragment>
                    )}
                  </p>
                  {username === user.username && (
                    <div className="flex edit-delete">
                      <p
                        className="text"
                        onClick={(e) => {
                          getCurrent({ exp: exp });
                          setPopup({ exp: true });
                        }}
                      >
                        Edit
                      </p>
                      <p
                        className="text"
                        onClick={(e) => deleteExperience(exp._id)}
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
  deleteExperience,
  getCurrent,
})(Experrience);
