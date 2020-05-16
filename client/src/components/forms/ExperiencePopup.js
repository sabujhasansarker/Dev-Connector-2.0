import React from "react";

const ExperiencePopup = () => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="card">
          <h1 className="text-center">Add Your Experience</h1>
          <form action="" className="form">
            <p className="text t-3">
              Let's get some information to make your profile stand out
              <br /> * =required field
            </p>
            <div className="form-group">
              <input type="text" placeholder="*Job Title" required />
            </div>
            <div className="form-group ">
              <input type="text" placeholder="*Company" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Location" required />
            </div>
            <div className="form-group">
              <p className="text">From Data</p>
              <input type="Date" required />
            </div>
            <div className="form-group ">
              <input type="checkbox" />
              Current Job
            </div>
            <div className="form-group">
              <p className="text">To Data</p>
              <input type="Date" required />
            </div>
            <div className="form-group">
              <textarea
                className="text-area"
                type="text"
                placeholder="Job Description"
              />
            </div>
            <div className="form-group float-right d-flex">
              <input type="button" value="Add" className="btn btn-save " />
              <input type="button" value="Cancel" className="btn " />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePopup;
