import React, { useState } from "react";

const EducationPopup = () => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="card">
          <h1 className="text-center">Add Your Education</h1>
          <form action="" className="form">
            <p className="text t-3">
              Let's get some information to make your profile stand out
              <br /> * =required field
            </p>
            <div className="form-group">
              <input type="text" placeholder="*School or Bootcamp" required />
            </div>
            <div className="form-group ">
              <input
                type="text"
                placeholder="*Degree or Certificate"
                required
              />
            </div>
            <div className="form-group">
              <input type="text" placeholder="*Field Of Study" required />
            </div>
            <div className="form-group">
              <p className="text">From Data</p>
              <input type="Date" required />
            </div>
            <div className="form-group ">
              <input type="checkbox" />
              Current School or Bootcamp
            </div>
            <div className="form-group">
              <p className="text">To Data</p>
              <input type="Date" required />
            </div>
            <div className="form-group">
              <textarea
                className="text-area"
                type="text"
                placeholder="Program Description"
              />
            </div>
            <div className="form-group float-right d-flex">
              <input type="button" value="Update" className="btn btn-save " />
              <input type="button" value="Cancel" className="btn " />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationPopup;
