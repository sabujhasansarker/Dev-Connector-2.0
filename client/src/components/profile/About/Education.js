import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";

import { setPopup } from "../../../action/popup";
import { getCurrent, deleteEducaion } from "../../../action/profile";

const Education = ({ education, getCurrent, deleteEducaion, setPopup }) => {
  return (
    <div className="education" id="education">
      <h1>Education</h1>
      <div className="p-20">
        <div className="top">
          <i
            className="fas fa-plus"
            onClick={(e) => setPopup({ edu: true })}
          ></i>
          <h6 className="add">Add Education</h6>
        </div>
        {education.map((edu) => (
          <div className="d-flex single-view" key={edu._id}>
            <i className="fas fa-user-graduate single-icon"></i>{" "}
            <div className="single-details">
              <p>Studied at {edu.school}</p>
              <p>
                Start in <Moment format="YYYY">{edu.from}</Moment>
              </p>
              {!edu.current && edu.to && (
                <p>
                  End in <Moment format="YYYY">{!edu.current && edu.to}</Moment>{" "}
                </p>
              )}
              <div className="mouse-in-out d-flex">
                <p
                  className="mr-10"
                  onClick={(e) => {
                    getCurrent({ edu: edu });
                    setPopup({ edu: true });
                  }}
                >
                  Edit
                </p>
                <p onClick={(e) => deleteEducaion(edu._id)}>Delete</p>
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  popup: state.popup,
});

export default connect(mapStateToProps, {
  setPopup,
  deleteEducaion,
  getCurrent,
})(Education);
