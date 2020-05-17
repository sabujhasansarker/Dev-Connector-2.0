import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { removePopup } from "../../action/popup";
import {
  removeCurrent,
  editExperience,
  addExperience,
} from "../../action/profile";

const ExperiencePopup = ({
  removeCurrent,
  removePopup,
  editExperience,
  addExperience,
  currentData,
}) => {
  const { title, to, company, from, description, current, _id } = currentData
    ? currentData
    : "";
  const [fromData, setFromData] = useState({
    title: title ? title : "",
    to: to ? moment(to.toString()).format("YYYY-MM-DD") : "",
    from: from ? moment(from.toString()).format("YYYY-MM-DD") : "",
    description: description ? description : "",
    company: company ? company : "",
    current: current ? current : false,
  });

  const onchange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    currentData.title ? editExperience(_id, fromData) : addExperience(fromData);
    removePopup();
    removeCurrent();
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="card">
          <h1 className="text-center">
            {currentData && currentData.company ? "Update" : "Add"} Your
            Experience
          </h1>
          <form onSubmit={onsubmit} className="form">
            <p className="text t-3">
              Let's get some information to make your profile stand out
              <br /> * =required field
            </p>
            <div className="form-group">
              <input
                type="text"
                name="title"
                required
                value={fromData.title}
                onChange={(e) => onchange(e)}
                placeholder="Enter Your title name"
              />
            </div>
            <div className="form-group ">
              <input
                type="text"
                required
                value={fromData.company}
                onChange={(e) => onchange(e)}
                name="company"
                placeholder="Enter Your company"
              />
            </div>
            <div className="form-group">
              <p className="text">From Data</p>
              <input
                type="date"
                name="from"
                required
                value={fromData.from}
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
              Current Job
            </div>
            {!fromData.current && (
              <div className="form-group ">
                <h4>To Date</h4>
                <input
                  type="date"
                  name="to"
                  required
                  onChange={(e) => onchange(e)}
                  value={fromData.to}
                />
              </div>
            )}
            <div className="form-group">
              <textarea
                className="text-area"
                type="text"
                name="description"
                placeholder="Program Description"
                onChange={(e) => onchange(e)}
                value={fromData.description}
              />
            </div>
            <div className="form-group float-right d-flex">
              <input
                type="submit"
                value={`${currentData.company ? "Update" : "Add"}`}
                className="btn btn-save "
              />
              <input
                type="submit"
                value="Cancel"
                className="btn "
                onClick={(e) => {
                  removePopup();
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
  currentData: state.profile.current !== null ? state.profile.current.exp : " ",
});

export default connect(mapStateToProps, {
  removeCurrent,
  removePopup,
  editExperience,
  addExperience,
})(ExperiencePopup);
