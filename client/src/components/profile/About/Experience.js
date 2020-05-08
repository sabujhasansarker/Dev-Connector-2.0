import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import Skills from "../timeLine/Skills";

const Experience = ({ experience, skills, status }) => {
  return (
    <div className="experience" id="experience">
      <h1>Experience</h1>
      <div className="p-20">
        <div className="top">
          <i className="fas fa-plus"></i>
          <h6 className="add">Add Experience</h6>
        </div>
        {experience.map((e) => (
          <div className="d-flex single-view " key={e._id}>
            <i className="fas fa-user-graduate single-icon"></i>{" "}
            <div className="single-details">
              <p>
                Work at {e.company} as {e.title}
              </p>
              <p>
                Start in <Moment format="YYYY">{e.from}</Moment>
              </p>
              {!e.current && e.to && (
                <p>
                  End in <Moment format="YYYY">{!e.current && e.to}</Moment>{" "}
                </p>
              )}
              <div className="mouse-in-out d-flex">
                <Link to="/" className="mr-10">
                  {" "}
                  Edit{" "}
                </Link>
                <Link to="/"> Delete </Link>
              </div>
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

export default Experience;
