import React, { useState } from "react";
import { connect } from "react-redux";

import fb from "../../icons/fb.svg";
import inst from "../../icons/inst.svg";
import lndin from "../../icons/linkdin.svg";
import twtter from "../../icons/twitter.svg";
import utube from "../../icons/youtube.svg";

// Function
import { profileUpdate, clearProfile } from "../../action/profile";
import { setAlert } from "../../action/alert";
import { Redirect } from "react-router-dom";

const ProfileForm = ({
  profile,
  profileUpdate,
  setAlert,
  user,
  clearProfile,
}) => {
  const [toggle, setToggle] = useState(false);

  const [fromData, setFromData] = useState({
    status: profile && profile.status ? profile.status : "",
    skills: profile && profile.skills ? profile.skills.join(",") : "",
    bio: profile && profile.bio ? profile.bio : "",
    company: profile && profile.company ? profile.company : "",
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
    username: profile && profile.username,
  });
  // redirect
  const [redirect, setRedirect] = useState(false);
  const {
    status,
    skills,
    bio,
    company,
    website,
    githubusername,
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
    clearProfile();
    if (skills && status) {
      setRedirect(true);
      if (profile) {
        setAlert("Update Successfully", "success");
      } else setAlert("Add Profile Successfully", "success");
    }
  };
  if (redirect) {
    return <Redirect to={`/${profile && profile.username}`} />;
  }
  if (profile && profile.username !== user.username) {
    return <Redirect to={`/${profile.username}`} />;
  }

  return (
    <div className="from-container profile">
      <div className=" card">
        <h1 className="text-center">
          {profile && profile ? "Update" : "Create"} profile
        </h1>
        <form className="form" onSubmit={onSubmit}>
          <p className="text t-3">
            Let's get some information to make your profile stand out
            <br /> * =required field
          </p>
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
          </div>
          <div className="form-group ">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group ">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="address"
              value={address}
              onChange={(e) => onChange(e)}
            />
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
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              value={bio}
              onChange={(e) => onChange(e)}
              name="bio"
            />
          </div>
          <div className="form-group ">
            <input
              type="button"
              value="Add Social Network Links"
              className=" add-social-btn"
              onClick={(e) => setToggle(!toggle)}
            />
            Optional
          </div>
          {toggle && (
            <div className="social">
              <div className="form-group d-flex">
                <img src={twtter} alt="" className="svg-img" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                  name="twitter"
                />
              </div>
              <div className="form-group d-flex">
                <img src={fb} alt="" className="svg-img" />
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                  placeholder="Facebook URL"
                  name="facebook"
                />
              </div>
              <div className="form-group d-flex">
                <img src={lndin} alt="" className="svg-img" />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                  name="linkedin"
                />
              </div>
              <div className="form-group d-flex">
                <img src={inst} alt="" className="svg-img" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                  name="instagram"
                />
              </div>
              <div className="form-group d-flex">
                <img src={utube} alt="" className="svg-img" />
                <input
                  type="text"
                  placeholder="YouTube URL"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                  name="youtube"
                />
              </div>
            </div>
          )}

          <div className="form-group float-right d-flex">
            <input
              type="submit"
              value={profile ? "Update" : "Add"}
              className="btn btn-save "
            />
            <input type="submit" value="Cancel" className="btn " />
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { setAlert, profileUpdate, clearProfile })(
  ProfileForm
);
