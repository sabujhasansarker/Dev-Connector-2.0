import React from "react";
import { Link } from "react-router-dom";

const AboutNav = ({ navTitle }) => {
  return (
    <div className="about-body">
      <div className="profile-header">
        <h3>{navTitle}</h3>
      </div>
      <div className="blank-65"></div>
      <div className="nav-continer">
        <div className="right-nav">
          <ul>
            <li>
              <Link to="/profile/about">Overview</Link>
            </li>
            <li>
              <Link to="/profile/about/education">Education</Link>
            </li>
            <li>
              <Link to="/profile/about/experrience">Experrience</Link>
            </li>
            <li>
              <Link to="/profile/about/contact-basic">
                Contact and basic info
              </Link>
            </li>
            <li>
              <Link to="/profile/about/github">Github</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutNav;
