import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { setAlert } from "../../action/alert";
import { updateUser } from "../../action/auth";

import "./Form.css";

const UserForm = ({ auth: { user, loading }, setAlert, updateUser }) => {
  const [formData, setFormData] = useState({
    firstName: !loading && user ? user.firstName : "",
    lastName: !loading && user ? user.lastName : "",
    email: !loading && user ? user.email : "",
    username: !loading && user ? user.username : "",
    password: "",
    password2: "",
    oldPassword: "",
  });
  const {
    email,
    firstName,
    lastName,
    username,
    password,
    password2,
    oldPassword,
  } = formData;
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmite = (e) => {
    e.preventDefault();
    if (oldPassword !== "") {
      if (password !== "") {
        if (password !== password2) {
          setAlert("Password dose not patch", "danger");
        } else {
          setFormData({
            email,
            firstName,
            lastName,
            username,
            password,
            oldPassword,
          });

          updateUser(formData);
          setFormData({
            email,
            firstName,
            lastName,
            username,
            password: "",
            password2: "",
            oldPassword: "",
          });
        }
      } else {
        setFormData({ email, firstName, lastName, username, oldPassword });

        updateUser(formData);
        setFormData({
          email,
          firstName,
          lastName,
          username,
          password: "",
          password2: "",
          oldPassword: "",
        });
      }
    } else {
      setAlert("Review to change provide your current password", "danger");
    }
  };

  return (
    <div className="from-container register">
      <div className=" card">
        <h1 className="text-center">User Update</h1>
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
          <div className="form-group d-flex">
            <input
              type="email"
              value={email}
              name="email"
              placeholder="Enter Your Valid Email"
              onChange={(e) => onchange(e)}
            />
            <input
              type="text"
              value={username}
              name="username"
              placeholder="Enter Your Username"
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-group d-flex">
            <input
              type="password"
              value={password}
              placeholder="Inter your password"
              name="password"
              onChange={(e) => onchange(e)}
            />{" "}
            <input
              type="password"
              value={password2}
              placeholder="Enter your confirm password"
              name="password2"
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="oldPassword"
              required
              value={oldPassword}
              placeholder="For change user setting enter your current password"
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-group float-right d-flex">
            <input type="submit" value="Update" className="btn btn-save " />
            <Link to="/">
              {" "}
              <input type="button" value="Cancel" className="btn " />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, updateUser })(UserForm);
