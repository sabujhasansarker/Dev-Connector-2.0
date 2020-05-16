import React, { useState } from "react";

import fb from "../../icons/fb.svg";
import inst from "../../icons/inst.svg";
import lndin from "../../icons/linkdin.svg";
import twtter from "../../icons/twitter.svg";
import utube from "../../icons/youtube.svg";

const ProfileForm = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="from-container profile">
      <div className=" card">
        <h1 className="text-center">Create profile</h1>
        <form action="" className="form">
          <p className="text t-3">
            Let's get some information to make your profile stand out
            <br /> * =required field
          </p>
          <div class="form-group">
            <select name="status">
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group ">
            <input type="text" placeholder="Company" />
          </div>
          <div className="form-group ">
            <input type="text " placeholder="Location" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="*Skills" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Github username" />
          </div>
          <div className="form-group">
            <textarea className="text-area" type="text" placeholder="Bio" />
          </div>
          <div className="form-group ">
            <input
              type="button"
              value="Add Social Network Links"
              className=" add-social-btn"
              onClick={(e) => setToggle(!toggle)}
            />
            Optional
          </div>
          {toggle && (
            <div className="social">
              <div className="form-group d-flex">
                <img src={twtter} alt="" className="svg-img" />
                <input type="url" placeholder="Enter your facebook url" />
              </div>
              <div className="form-group d-flex">
                <img src={fb} alt="" className="svg-img" />
                <input type="url" placeholder="Enter your facebook url" />
              </div>
              <div className="form-group d-flex">
                <img src={lndin} alt="" className="svg-img" />
                <input type="url" placeholder="Enter your facebook url" />
              </div>
              <div className="form-group d-flex">
                <img src={inst} alt="" className="svg-img" />
                <input type="url" placeholder="Enter your facebook url" />
              </div>
              <div className="form-group d-flex">
                <img src={utube} alt="" className="svg-img" />
                <input type="url" placeholder="Enter your facebook url" />
              </div>
            </div>
          )}

          <div className="form-group float-right d-flex">
            <input type="button" value="Update" className="btn btn-save " />
            <input type="button" value="Cancel" className="btn " />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
