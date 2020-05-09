import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { removePopup } from "../../../action/popup";

import {
  removeCurrent,
  editExperience,
  addExperience,
} from "../../../action/profile";

const ExperienceFrom = ({
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
    to: to ? to : "",
    from: from ? from : "",
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
      <div className="popup_inner">
        <h2>Experience</h2>
        <form onSubmit={onsubmit}>
          <div className="form-group d-flex">
            <input
              type="text"
              name="title"
              value={fromData.title}
              onChange={(e) => onchange(e)}
              placeholder="Enter Your title name"
            />
          </div>
          <div className="form-group ">
            <input
              type="text"
              value={fromData.company}
              onChange={(e) => onchange(e)}
              name="company"
              placeholder="Enter Your company"
            />
          </div>
          <div className="form-group ">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={
                fromData.form && moment(fromData.form).format("YYYY-MM-DD")
              }
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
                value={fromData.to && moment(fromData.to).format("YYYY-MM-DD")}
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
            {currentData.title ? (
              <input type="submit" value="Update" />
            ) : (
              <input type="submit" value="Add education" />
            )}

            <button
              onClick={(e) => {
                removePopup();
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
  currentData: state.profile.current !== null ? state.profile.current.exp : " ",
});

export default connect(mapStateToProps, {
  removeCurrent,
  removePopup,
  editExperience,
  addExperience,
})(ExperienceFrom);
