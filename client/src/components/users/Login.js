import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="text-center login ">
      <h1 className="title">Login your account</h1>
      <form action="">
        <div className="form-group">
          <input type="text" placeholder="Inter your email or username" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Inter your password" />
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

export default Login;
