import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { profileUpdate } from "../../../action/profile";
import Spnnier from "../../layouts/Spnnier";
import { setAlert } from "../../../action/alert";

const ProfileFroms = ({
  auth: { loading, user },
  setAlert,
  profileUpdate,
  profile,
}) => {
  const [toggle, setToggle] = useState(false);

  const [fromData, setFromData] = useState({
    status: profile && profile.status ? profile.status : "",
    skills: profile && profile.skills ? profile.skills.join(",") : "",
    bio: profile && profile.bio ? profile.bio : "",
    compnay: profile && profile.compnay ? profile.compnay : "",
    birthday: profile && profile.birthday ? profile.birthday : "",
    website: profile && profile.website ? profile.website : "",
    githubusername:
      profile && profile.githubusername ? profile.githubusername : "",
    profilePic: profile && profile.profilePic ? profile.profilePic : "",
    address: profile && profile.address ? profile.address : "",
    youtube:
      profile && profile.social && profile.social.youtube
        ? profile.social.youtube
        : "",
    facebook:
      profile && profile.social && profile.social.facebook
        ? profile.social.facebook
        : "",
    twitter:
      profile && profile.social && profile.social.twitter
        ? profile.social.twitter
        : "",
    instagram:
      profile && profile.social && profile.social.instagram
        ? profile.social.instagram
        : "",
    linkedin:
      profile && profile.social && profile.social.profile
        ? profile.social.profile
        : "",
  });

  if (loading) {
    return <Spnnier />;
  }
  const {
    status,
    skills,
    bio,
    compnay,
    birthday,
    website,
    githubusername,
    profilePic,
    address,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = fromData;

  const onChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    profileUpdate(fromData);
    if (skills && status) {
      if (profile) {
        setAlert("Update Successfully", "success");
      } else setAlert("Add Profile Successfully", "success");
    }
  };

  return (
    <div className="create-profile">
      <h1 className="large text-primary">
        {profile ? "Update" : "Create"} Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select
            name="status"
            required
            value={status}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="compnay"
            value={compnay}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={skills}
            required
            onChange={(e) => onChange(e)}
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            value={bio}
            onChange={(e) => onChange(e)}
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => setToggle(!toggle)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {toggle && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                onChange={(e) => onChange(e)}
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                value={facebook}
                onChange={(e) => onChange(e)}
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtube}
                onChange={(e) => onChange(e)}
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                onChange={(e) => onChange(e)}
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                onChange={(e) => onChange(e)}
                name="instagram"
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { profileUpdate, setAlert })(
  ProfileFroms
);