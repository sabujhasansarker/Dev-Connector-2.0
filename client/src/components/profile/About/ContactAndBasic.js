import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { profileUpdate } from "../../../action/profile";
import { setAlert } from "../../../action/alert";

const ContactAndBasic = ({ profile, user, profileUpdate, setAlert }) => {
  const { social } = profile && profile;
  const [formData, setFormData] = useState({
    facebook: social.facebook ? social.facebook : "",
    twitter: social.twitter ? social.twitter : "",
    website: profile.website ? profile.website : "",
    youtube: social.youtube ? social.youtube : "",
    linkedin: social.linkedin ? social.linkedin : "",
    instagram: social.instagram ? social.instagram : "",
    skills: profile.skills.join(","),
    status: profile.status,
  });
  const { facebook, twitter, website, youtube, linkedin, instagram } = formData;
  const [toggle, setToggle] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    profileUpdate(formData);
    setAlert("Update Successfully", "success");
    setToggle(!toggle);
  };
  return (
    <div className="contact">
      <h1>Contact and Basic Information</h1>
      <div className="p-20">
        <p>Email : {user.email}</p>
        <hr />
        <p>
          Username :{" "}
          <Link to={`/${profile.username}`}>
            http://localhost:3000/{profile.username}
          </Link>
        </p>
        <hr />
        <div className="website_social_link">
          <h4>WEBSITES AND SOCIAL LINKS</h4>
          <br />
          {!toggle && (
            <div className="top">
              <i
                className="fas fa-plus"
                onClick={(e) => setToggle(!toggle)}
              ></i>
              <h6 className="add">Add Website and social links</h6>
            </div>
          )}

          {toggle && (
            <div className="create-profile">
              <form className="form" onSubmit={onSubmit}>
                <div className="form-group social-input">
                  <i className="fas fa-globe fa-2x"></i>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => onChange(e)}
                    placeholder="Website URL"
                    name="website"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x"></i>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => onChange(e)}
                    placeholder="Twitter URL"
                    name="twitter"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x"></i>
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x"></i>
                  <input
                    type="url"
                    name="youtube"
                    value={youtube}
                    onChange={(e) => onChange(e)}
                    placeholder="YouTube URL"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <input
                    type="url"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x"></i>
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary my-1"
                />
                <input
                  type="submit"
                  value="Cancel"
                  className="btn btn-primary my-1"
                  onClick={(e) => setToggle(!toggle)}
                />
              </form>
            </div>
          )}
          {!toggle && (
            <Fragment>
              {profile.website && (
                <p>
                  Website : <Link to={profile.website}>{profile.website}</Link>{" "}
                </p>
              )}
              <hr />
              {social && (
                <p>
                  Social Link :
                  {profile.githubusername && profile.githubusername && (
                    <a
                      href={`http://github.com/${profile.githubusername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )}
                  {social && social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                  )}
                  {social && social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                  )}
                  {social && social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube fa-2x"></i>
                    </a>
                  )}
                  {social && social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                  )}
                  {social && social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  )}
                </p>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { profileUpdate, setAlert })(ContactAndBasic);
