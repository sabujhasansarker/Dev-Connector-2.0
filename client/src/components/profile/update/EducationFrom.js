import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { removePopup } from "../../../action/popup";

import { removeCurrent } from "../../../action/profile";

const EducationFrom = ({ removeCurrent, removePopup, currentData }) => {
  const { school, to, degree, from, fieldofstudy, description, current } =
    currentData && currentData.edu;

  const [fromData, setFromData] = useState(currentData.edu);
  const [toggle, setToggle] = useState(fromData.current);
  const onchange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    console.log(fromData);
  };
  return (
    <div className="popup">
      <div className="popup_inner">
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
              value={moment(fromData.form).format("YYYY-MM-DD")}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-group d-flex">
            <p>
              {fromData.current ? (
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFromData({ ...fromData, current: !fromData.current })
                  }
                  checked
                  name="current"
                  value=""
                />
              ) : (
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFromData({ ...fromData, current: !fromData.current })
                  }
                  name="current"
                  value=""
                />
              )}
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
                value={moment(fromData.to).format("YYYY-MM-DD")}
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
            {fromData === currentData.edu ? (
              <input type="submit" disabled value="Update" />
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
  currentData: state.profile.current,
});

export default connect(mapStateToProps, { removeCurrent, removePopup })(
  EducationFrom
);
