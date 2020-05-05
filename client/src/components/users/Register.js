import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="text-center register ">
      <h1 className="title">Register account</h1>
      <form action="">
        <div className="form-group d-flex">
          <input
            type="text"
            name="firstName"
            placeholder="Enter Your First Name"
          />{" "}
          <input
            type="text"
            name="lastName"
            placeholder="Enter Your Last Name"
          />
        </div>
        <div className="form-group ">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Valid Email"
          />
        </div>
        <div className="form-group d-flex">
          <input
            type="password"
            placeholder="Inter your password"
            name="password2"
          />{" "}
          <input
            type="password"
            placeholder="Enter your confirm password"
            name="password2"
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

export default Register;
