import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../action/auth";

import "./Form.css";

const LoginForm = ({ login, isAutination }) => {
   const [fromData, setFromData] = useState();
  const user = useRef("");
  const password = useRef("");
  const onchange = (e) => {
    setFromData({ [e.target.name]: e.target.value });
    if (
      user.current.value &&
      user.current.value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)
    ) {
      setFromData({
        email: user.current.value,
        password: password.current.value,
      });
    } else {
      setFromData({
        username: user.current.value,
        password: password.current.value,
      });
    }
  };
  const onsubmit = (e) => {
    e.preventDefault();
    login(fromData);
  };

  if (isAutination) {
    return <Redirect to="/" />;
  }
  return (
    <div className="from-container login">
      <div className=" card">
        <h1 className="text-center">Login</h1>
        <form action="" className="form" onSubmit={onsubmit}>
          <div className="form-group ">
            <input
            onChange={(e) => onchange(e)}
            ref={user}
            type="text"
            placeholder="Inter your email or username"
          />
            </div>
          <div className="form-group">
            <input
            type="password"
            ref={password}
            onChange={(e) => onchange(e)}
            placeholder="Inter your password"
          />
          </div>
          <div className="form-group float-right">
            <input type="submit" value="Login" className="btn btn-large" />
          </div>
          <br />
          <p className="text">
            If you are not user please <Link to="/register">register !</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapToStateProps = (state) => ({
  isAutination: state.auth.isAutination,
});

export default connect(mapToStateProps, { login })(LoginForm);
