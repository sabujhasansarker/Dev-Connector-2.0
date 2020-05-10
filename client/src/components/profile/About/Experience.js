import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";

import { setPopup } from "../../../action/popup";
import Skills from "../timeLine/Skills";
import { deleteExperience, getCurrent } from "../../../action/profile";

const Experience = ({
  getCurrent,
  setPopup,
  experience,
  skills,
  status,
  user,
  profile,
  deleteExperience,
}) => {
  return (
    <div className="experience" id="experience">
      <h1>Experience</h1>
      <div className="p-20">
        {profile === user && (
          <div className="top">
            <i
              className="fas fa-plus"
              onClick={(e) => {
                setPopup({ exp: true });
              }}
            ></i>
            <h6 className="add">Add Experience</h6>
          </div>
        )}

        {experience.map((exp) => (
          <div className="d-flex single-view " key={exp._id}>
            <i className="fas fa-user-graduate single-icon"></i>{" "}
            <div className="single-details">
              <p>
                Work at {exp.company} as {exp.title}
              </p>
              <p>
                Start in <Moment format="YYYY">{exp.from}</Moment>
              </p>
              {!exp.current && exp.to && (
                <p>
                  End in <Moment format="YYYY">{!exp.current && exp.to}</Moment>{" "}
                </p>
              )}
              {profile === user && (
                <div className="mouse-in-out d-flex">
                  <p
                    className="mr-10"
                    onClick={(e) => {
                      getCurrent({ exp: exp });
                      setPopup({ exp: true });
                    }}
                  >
                    {" "}
                    Edit{" "}
                  </p>
                  <p onClick={(e) => deleteExperience(exp._id)}> Delete </p>
                </div>
              )}
            </div>
          </div>
        ))}
        <hr />
        <div className="skills">
          <h4>PROFESSIONAL SKILLS</h4>
          {skills && <Skills skills={skills} status={status} />}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  popup: state.popup,
  user: state.auth.user.username,
  profile: state.profile.profile.username,
});

export default connect(mapStateToProps, {
  setPopup,
  deleteExperience,
  getCurrent,
})(Experience);
