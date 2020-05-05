import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="inner container">
        <nav>
          <Link to="/" className="logo">
            Logo
          </Link>
          <input type="checkbox" name="" id="nav" />{" "}
          <label htmlFor="nav"></label>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
