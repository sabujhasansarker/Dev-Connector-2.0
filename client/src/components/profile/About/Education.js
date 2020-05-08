import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Education = ({ education }) => {
  return (
    <div className="education" id="education">
      <h1>Education</h1>
      <div className="p-20">
        <div className="top">
          <i className="fas fa-plus"></i>
          <h6 className="add">Add Education</h6>
        </div>
        {education.map((e) => (
          <div className="d-flex single-view" key={e._id}>
            <i className="fas fa-user-graduate single-icon"></i>{" "}
            <div className="single-details">
              <p>Studied at {e.school}</p>
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
      </div>
    </div>
  );
};

export default Education;
