import React from "react";
import { Link } from "react-router-dom";

import "./Form.css";

const UserForm = () => {
  return (
    <div className="from-container register">
      <div className=" card">
        <h1 className="text-center">User Update</h1>
        <form action="" className="form">
          <div className="form-group d-flex">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group d-flex">
            <input type="Email" placeholder="Email" />
            <input type="text" placeholder="Username" />
          </div>
          <div className="form-group d-flex">
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Again password" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Current Password" />
          </div>
          <div className="form-group float-right d-flex">
            <input type="button" value="Update" className="btn btn-save " />
            <input type="button" value="Cancel" className="btn " />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
