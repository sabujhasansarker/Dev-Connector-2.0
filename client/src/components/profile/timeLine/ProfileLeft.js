import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

import { profileUpdate } from "../../../action/profile";

const ProfileLeft = ({ profile, profileUpdate }) => {
  const [toggle, setToggle] = useState(false);
  const { education, experience, bio, status, address, date, skills } =
    profile && profile;

  const [fromdata, setFromdata] = useState({
    skills: skills ? skills.join(",") : "",
    status: status,
  });
  const onchage = (e) => {
    setFromdata({ ...fromdata, skills: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    setFromdata({ ...fromdata, status });

    profileUpdate(fromdata);
    setToggle(!toggle);
  };
  return (
    <div className="intro p-20 shadwo">
      <i className="fas fa-globe-europe"></i> Intro
      <div className="intro-text">
        {skills && (
          <div className="text-center ">
            <p>Skills</p>

            {!toggle ? (
              <Fragment>
                <div className="skills">
                  {skills.map((e, index) => (
                    <p key={index}>{e} </p>
                  ))}
                </div>
                <button onClick={(e) => setToggle(!toggle)}>
                  update skills
                </button>
              </Fragment>
            ) : (
              <form onSubmit={onsubmit}>
                <textarea
                  type="text"
                  value={fromdata.skills}
                  onChange={(e) => onchage(e)}
                />
                <button onClick={(e) => setToggle(!toggle)}>Cancel</button>
                {skills.join(",") === fromdata.skills ? (
                  <input type="submit" disabled value="Save" />
                ) : (
                  <input type="submit" value="Save" />
                )}
              </form>
            )}

            <hr />
          </div>
        )}
        {bio && (
          <div className="text-center ">
            {bio} <hr />
          </div>
        )}
        {education &&
          education.length > 0 &&
          education.map((e) => (
            <p key={e._id}>
              <i className="fas fa-graduation-cap"></i>
              {e.to && e.to ? "Went to" : "Studies "} {e.fieldofstudy} at{" "}
              {e.school}
            </p>
          ))}

        {experience && (
          <Fragment>
            {experience.map((e) => (
              <p key={e._id}>
                <i className="fas fa-briefcase"></i>
                {e.to && e.to ? "Working" : "Former"} at {e.title}
                {e.company}
              </p>
            ))}{" "}
          </Fragment>
        )}
        {address && (
          <Fragment>
            <i className="fas fa-home "></i> Live in {address}
          </Fragment>
        )}
        {date && (
          <p>
            <i className="fas fa-clock"></i> Joined on{" "}
            <Moment format="MMMM YYYY">{date}</Moment>
          </p>
        )}
      </div>
    </div>
  );
};

export default connect(null, { profileUpdate })(ProfileLeft);
