import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { removePopup } from "../../action/popup";
import {
  removeCurrent,
  updateEducaion,
  addEducaion,
} from "../../action/profile";

const EducationPopup = ({
  currentData,
  removeCurrent,
  updateEducaion,
  addEducaion,
  removePopup,
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
      <div className="popup-content">
        <div className="card">
          <h1 className="text-center">Add Your Education</h1>
          <form className="form" onSubmit={onsubmit}>
            <p className="text t-3">
              Let's get some information to make your profile stand out
              <br /> * =required field
            </p>
            <div className="form-group">
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
            <div className="form-group">
              <input
                type="text"
                value={fromData.fieldofstudy}
                onChange={(e) => onchange(e)}
                placeholder="Enter your field of study"
                name="fieldofstudy"
              />
            </div>
            <div className="form-group">
              <p className="text">From Data</p>
              <input
                type="date"
                name="from"
                value={
                  fromData.form && moment(fromData.form).format("YYYY-MM-DD")
                }
                onChange={(e) => onchange(e)}
              />
            </div>
            <div className="form-group ">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFromData({ ...fromData, current: !fromData.current })
                }
                checked={fromData.current}
                name="current"
              />
              Current School or Bootcamp
            </div>
            {!fromData.current && (
              <div className="form-group ">
                <p className="text">To Data</p>
                <input
                  type="date"
                  name="to"
                  onChange={(e) => onchange(e)}
                  value={
                    fromData.to && moment(fromData.to).format("YYYY-MM-DD")
                  }
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your description"
                name="description"
                onChange={(e) => onchange(e)}
                value={fromData.description}
              />
            </div>
            <div className="form-group float-right d-flex">
              <input
                type="submit"
                value={`${currentData.school ? "Update" : "Add"}`}
                className="btn btn-save "
              />
              <input
                type="submit"
                value="Cancel"
                className="btn "
                onClick={(e) => {
                  removePopup({ edu: false });
                  removeCurrent();
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentData: state.profile.current !== null ? state.profile.current.edu : " ",
});

export default connect(mapStateToProps, {
  removeCurrent,
  updateEducaion,
  addEducaion,
  removePopup,
})(EducationPopup);
