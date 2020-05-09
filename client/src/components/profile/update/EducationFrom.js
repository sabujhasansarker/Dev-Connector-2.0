import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { removePopup } from "../../../action/popup";

import {
  removeCurrent,
  updateEducaion,
  addEducaion,
} from "../../../action/profile";

const EducationFrom = ({
  removeCurrent,
  removePopup,
  updateEducaion,
  addEducaion,
  currentData,
}) => {
  const {
    school,
    to,
    degree,
    from,
    fieldofstudy,
    description,
    current,
    _id,
  } = currentData ? currentData : "";
  const [fromData, setFromData] = useState({
    school: school ? school : "",
    to: to ? to : "",
    from: from ? from : "",
    description: description ? description : "",
    degree: degree ? degree : "",
    fieldofstudy: fieldofstudy ? fieldofstudy : "",
    current: current ? current : false,
  });

  const onchange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    currentData.school ? updateEducaion(_id, fromData) : addEducaion(fromData);
    removePopup({ edu: false });
    removeCurrent();
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <h2>Education</h2>
        <form onSubmit={onsubmit}>
          <div className="form-group d-flex">
            <input
              type="text"
              name="school"
              value={fromData.school}
              onChange={(e) => onchange(e)}
              placeholder="Enter Your School name"
            />
          </div>
          <div className="form-group ">
            <input
              type="text"
              value={fromData.degree}
              onChange={(e) => onchange(e)}
              name="degree"
              placeholder="Enter Your Degree"
            />
          </div>
          <div className="form-group ">
            <input
              type="text"
              value={fromData.fieldofstudy}
              onChange={(e) => onchange(e)}
              placeholder="Enter your field of study"
              name="fieldofstudy"
            />
          </div>
          <div className="form-group ">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from && moment(fromData.form).format("YYYY-MM-DD")}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-group d-flex">
            <p>
              <input
                type="checkbox"
                onChange={(e) =>
                  setFromData({ ...fromData, current: !fromData.current })
                }
                checked={fromData.current}
                name="current"
              />
              Current Job
            </p>
          </div>
          {!fromData.current && (
            <div className="form-group ">
              <h4>To Date</h4>
              <input
                type="date"
                name="to"
                onChange={(e) => onchange(e)}
                value={to && moment(fromData.to).format("YYYY-MM-DD")}
              />
            </div>
          )}
          <div className="form-group ">
            <input
              type="text"
              placeholder="Enter your description"
              name="description"
              onChange={(e) => onchange(e)}
              value={fromData.description}
            />
          </div>
          <div className="d-flex">
            {currentData.school ? (
              <input type="submit" value="Update" />
            ) : (
              <input type="submit" value="Add education" />
            )}

            <button
              onClick={(e) => {
                removePopup({ edu: false });
                removeCurrent();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentData: state.profile.current !== null ? state.profile.current.edu : " ",
});

export default connect(mapStateToProps, {
  removeCurrent,
  removePopup,
  updateEducaion,
  addEducaion,
})(EducationFrom);
