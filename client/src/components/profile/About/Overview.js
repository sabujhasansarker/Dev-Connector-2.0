import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setPopup, removePopup } from "../../../action/popup";
import EducationFrom from "../update/EducationFrom";

const Overview = ({ profile, setPopup, removePopup, popup }) => {
  let { education, address, experience, social, website } = profile;

  return (
    <div id="overview">
      <h1>Overview</h1>
      <div className="p-20">
        <div className="left">
          <div className="experience">
            <div className="top">
              <i className="fas fa-plus" onClick={(e) => setPopup()}></i>
              <h6 className="add">Add Experience</h6>
            </div>
            {experience.map((e) => (
              <Fragment key={e._id}>
                {!e.to && (
                  <div className="d-flex single-view">
                    <i className="fas fa-user-graduate single-icon"></i>
                    <div className="single-details">
                      <p>Work at {e.company}</p>
                      <p>
                        Start in <Moment format="YYYY">{e.from}</Moment>
                      </p>
                      <div className="mouse-in-out d-flex">
                        <Link to="/" className="mr-10">
                          {" "}
                          Edit{" "}
                        </Link>
                        <Link to="/"> Delete </Link>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
            <hr />
          </div>
          <div className="education">
            <div className="top">
              <i className="fas fa-plus"></i>
              <h6 className="add">Add Education</h6>
            </div>
            {education.map((e) => (
              <Fragment key={e._id}>
                {!e.to && (
                  <div className="d-flex single-view" key={e._id}>
                    <i className="fas fa-user-graduate single-icon"></i>
                    <div className="single-details">
                      <p>Studied at {e.school}</p>
                      <p>
                        Start in <Moment format="YYYY">{e.from}</Moment>
                      </p>
                      <div className="mouse-in-out d-flex">
                        <Link to="/" className="mr-10">
                          {" "}
                          Edit{" "}
                        </Link>
                        <Link to="/"> Delete </Link>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
            <hr />
          </div>
          <div className="address">
            <div className="top">
              <i className="fas fa-plus"></i>
              <h6 className="add">Add Address</h6>
              {address && (
                <div className="d-flex">
                  <i className="fas fa-user-graduate single-icon"></i> {address}
                </div>
              )}
            </div>
            <hr />
          </div>
        </div>
        <div className="right">
          <div className="social-link">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <i class="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
      </div>
      {popup && <EducationFrom />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  popup: state.popup,
});

export default connect(mapStateToProps, { setPopup, removePopup })(Overview);
