import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert } from "../../action/alert";
import { register } from "../../action/auth";

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });
  const { email, firstName, lastName, password, password2 } = formData;
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmite = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password dose not patch", "danger");
    } else {
      register(formData);
    }
  };
  return (
    <div className="text-center register ">
      <h1 className="title">Register account</h1>
      <form onSubmit={onsubmite}>
        <div className="form-group d-flex">
          <input
            type="text"
            name="firstName"
            placeholder="Enter Your First Name"
            onChange={(e) => onchange(e)}
          />{" "}
          <input
            type="text"
            name="lastName"
            placeholder="Enter Your Last Name"
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group ">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Valid Email"
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group d-flex">
          <input
            type="password"
            placeholder="Inter your password"
            name="password"
            onChange={(e) => onchange(e)}
          />{" "}
          <input
            type="password"
            placeholder="Enter your confirm password"
            name="password2"
            onChange={(e) => onchange(e)}
          />
        </div>
        <input type="submit" value="Register" className="btn" />
      </form>
      <p>
        If You are alrady register user please <Link to="/login">Login </Link>
      </p>
    </div>
  );
};

export default connect(null, { setAlert, register })(Register);
