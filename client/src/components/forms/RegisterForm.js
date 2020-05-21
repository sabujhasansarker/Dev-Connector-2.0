import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert } from "../../action/alert";
import { register } from "../../action/auth";
import "./Form.css";
const RegisterFrom = ({ setAlert, register, isAutination }) => {
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
  if (isAutination) {
    return <Redirect to="/" />;
  }
  return (
    <div className="from-container register">
      <div className=" card">
        <h1 className="text-center">Register</h1>
        <form action="" className="form" onSubmit={onsubmite}>
          <div className="form-group d-flex">
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter Your First Name"
              onChange={(e) => onchange(e)}
            />{" "}
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter Your Last Name"
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-group ">
            <input
              type="email"
              value={email}
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
          <div className="form-group float-right">
            <input type="submit" value="Register" className="btn btn-large" />
          </div>
          <br />
          <p className="text">
            If you are not user please <Link to="/login">Login !</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapToStateProps = (state) => ({
  isAutination: state.auth.isAutination,
});

export default connect(mapToStateProps, { setAlert, register })(RegisterFrom);
