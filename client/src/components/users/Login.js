import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../action/auth";

const Login = ({ login }) => {
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
  return (
    <div className="text-center login ">
      <h1 className="title">Login your account</h1>
      <form onSubmit={onsubmit}>
        <div className="form-group">
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
        <input type="submit" value="Login" className="btn" />
      </form>
      <p>
        If You are not register user please{" "}
        <Link to="/register">Register </Link>
      </p>
    </div>
  );
};

export default connect(null, { login })(Login);
