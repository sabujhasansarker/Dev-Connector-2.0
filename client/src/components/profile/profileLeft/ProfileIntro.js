import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import editicon from "../../../icons/edit.svg";
import skillIcon from "../../../icons/skills.svg";
import educationIcon from "../../../icons/school.svg";
import companyIcon from "../../../icons/company.svg";
import bioIcon from "../../../icons/bio.svg";
import workIcon from "../../../icons/work.svg";

// Social
import fb from "../../../icons/fb.svg";
import inst from "../../../icons/inst.svg";
import lndin from "../../../icons/linkdin.svg";
import twtter from "../../../icons/twitter.svg";
import utube from "../../../icons/youtube.svg";
import git from "../../../icons/git.svg";
import web from "../../../icons/web.svg";

// Profile update
import { profileUpdate } from "../../../action/profile";
import Moment from "react-moment";

const ProfileIntro = ({ profile, user, profileUpdate }) => {
  const [skilltoggle, setSkilltoggle] = useState(false);
  const [commpanytoggle, setCommpanytoggle] = useState(false);
  const [biotoggle, setBiotoggle] = useState(false);

  // profile
  let {
    profilePic,
    education,
    experience,
    bio,
    status,
    skills,
    social,
    website,
    company,
    githubusername,
  } = profile ? profile : "";

  let { firstName, lastName } = profile ? profile.user : "";

  firstName = firstName ? firstName : user && user.firstName;
  lastName = lastName ? lastName : user && user.lastName;
  profilePic = profilePic ? profilePic : user && user.profilePic;

  // update
  const [fromdata, setFromdata] = useState({
    skills: skills ? skills.join(",") : "",
    status: status,
    company: company,
    bio: bio,
  });
  const onchage = (e) => {
    setFromdata({ ...fromdata, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFromdata({ ...fromdata });

    profileUpdate(fromdata);
    if (biotoggle) {
      setBiotoggle(false);
    }
  };

  return (
    <div className="intro">
      <div className="header">
        <div className="file-input">
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="file-input__input"
          />
          <label className="file-input__label" htmlFor="file-input">
            {profile && profile.username === user.username && (
              <img src={editicon} className="svg-img" alt="" />
            )}
          </label>
        </div>
        <img className="profile-pic" src={profilePic} alt="" />
        <h2 className="text-center" style={{ textTransform: "capitalize" }}>
          {firstName + " " + lastName}
        </h2>
      </div>
      {skills && (
        <div className="skills flex">
          <img src={skillIcon} className="svg-img" alt="" />
          {skilltoggle ? (
            <form className="form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={fromdata.skills}
                  onChange={(e) => onchage(e)}
                  name="skills"
                />
              </div>
              <div className="text">
                <p onClick={onSubmit} onClick={(e) => setSkilltoggle(false)}>
                  Save
                </p>
                <p onClick={(e) => setSkilltoggle(false)}>Cancel</p>
              </div>
            </form>
          ) : (
            <Fragment>
              <p className="text">{fromdata.skills}</p>
              {profile && profile.username === user.username && (
                <img
                  src={editicon}
                  onClick={(e) => setSkilltoggle(true)}
                  className="svg-img"
                  alt=""
                />
              )}
            </Fragment>
          )}
        </div>
      )}
      {fromdata.company && (
        <div className="company flex">
          <img src={companyIcon} className="svg-img" alt="" />
          {commpanytoggle ? (
            <form className="form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={fromdata.company}
                  onChange={(e) => onchage(e)}
                  name="company"
                />
              </div>
              <div className="text">
                <input
                  type="submit"
                  value="Save"
                  onClick={(e) => setCommpanytoggle(false)}
                />
                <p onClick={(e) => setCommpanytoggle(false)}>Cancel</p>
              </div>
            </form>
          ) : (
            <Fragment>
              <p className="text">{fromdata.company}</p>

              {profile && profile.username === user.username && (
                <img
                  src={editicon}
                  onClick={(e) => setCommpanytoggle(true)}
                  className="svg-img"
                  alt=""
                />
              )}
            </Fragment>
          )}
        </div>
      )}
      {bio && (
        <div className="bio flex">
          <img src={bioIcon} className="svg-img" alt="" />
          {biotoggle ? (
            <form onSubmit={onSubmit} className="form">
              <div className="form-group">
                <textarea
                  type="text"
                  value={fromdata.bio}
                  onChange={(e) => onchage(e)}
                  name="bio"
                />
              </div>
              <div className="text">
                <input type="submit" value="Save" />
                <p onClick={(e) => setBiotoggle(false)}>Cancel</p>
              </div>
            </form>
          ) : (
            <Fragment>
              <p className="text">{fromdata.bio}</p>

              {profile && profile.username === user.username && (
                <img
                  src={editicon}
                  onClick={(e) => setBiotoggle(true)}
                  className="svg-img"
                  alt=""
                />
              )}
            </Fragment>
          )}
        </div>
      )}
      {education &&
        education.map(
          (edu) =>
            !edu.to && (
              <div className="education flex" key={edu._id}>
                <img src={educationIcon} className="svg-img" alt="" />
                <p className="text">
                  Study management at <b>{edu.school}</b> from{" "}
                  <Moment format="YYYY">{edu.form}</Moment>
                </p>
              </div>
            )
        )}
      {experience &&
        experience.map(
          (exp) =>
            !exp.to && (
              <div className="work flex" key={exp._id}>
                <img src={workIcon} className="svg-img" alt="" />
                <p className="text">
                  Work at <b>{exp.company}</b> as a {exp.title} from{" "}
                  <Moment format="YYYY">{exp.from}</Moment>
                </p>
              </div>
            )
        )}

      <div className="social-icons">
        <ul className="flex">
          {social && social.facebook && (
            <li>
              <a href={social.facebook} target="_blank">
                <img src={fb} className="svg-img" alt="" />
              </a>
            </li>
          )}
          {social && social.instagram && (
            <li>
              <a href={social.instagram} target="_blank">
                <img src={inst} className="svg-img" alt="" />
              </a>
            </li>
          )}

          {social && social.linkedin && (
            <li>
              <a href={social.linkedin} target="_blank">
                <img src={lndin} className="svg-img" alt="" />
              </a>
            </li>
          )}

          {social && social.twitter && (
            <li>
              <a href={social.twitter} target="_blank">
                <img src={twtter} className="svg-img" alt="" />
              </a>
            </li>
          )}

          {social && social.youtube && (
            <li>
              <a href={social.youtube} target="_blank">
                <img src={utube} className="svg-img" alt="" />
              </a>
            </li>
          )}
          {githubusername && (
            <li>
              <a href={`http://github.com/${githubusername}`} target="_blank">
                <img src={git} className="svg-img" alt="" />
              </a>
            </li>
          )}
          {website && (
            <li>
              <a href={website} target="_blank">
                <img src={web} className="svg-img" alt="" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default connect(null, {
  profileUpdate,
})(ProfileIntro);
