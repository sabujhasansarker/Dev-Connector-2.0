import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import AboutNav from "./AboutNav";

import editIcon from "../../../../icons/edit.svg";
import addIcon from "../../../../icons/add.svg";

import mailIcon from "../../../../icons/communications.svg";
import webIcon from "../../../../icons/web.svg";
import avatarIcon from "../../../../icons/avatar.svg";

import fb from "../../../../icons/fb.svg";
import inst from "../../../../icons/inst.svg";
import lndin from "../../../../icons/linkdin.svg";
import twtter from "../../../../icons/twitter.svg";
import utube from "../../../../icons/youtube.svg";
import { connect } from "react-redux";

// Funtion
import { profileUpdate } from "../../../../action/profile";

const Contact = ({ profile, user: { username }, profileUpdate }) => {
  const [webtoggle, setWebtoggle] = useState(false);
  const [socialtoggle, setSocialtoggle] = useState(false);

  let { social, website, user } = profile ? profile : "";
  let { email } = user && user ? user : "";
  const [fromdata, setFromdata] = useState({
    skills: profile && profile ? profile.skills.join(",") : "",
    status: profile && profile ? profile.status : "",
    facebook: social && social.facebook ? social.facebook : "",
    instagram: social && social.instagram ? social.instagram : "",
    linkedin: social && social.linkedin ? social.linkedin : "",
    twitter: social && social.twitter ? social.twitter : "",
    youtube: social && social.youtube ? social.youtube : "",
    website: website ? website : "",
  });
  const { facebook, twitter, instagram, linkedin, youtube } = fromdata;
  const onchange = (e) =>
    setFromdata({ ...fromdata, [e.target.name]: e.target.value });
  const onsubmite = (e) => {
    e.preventDefault();
    profileUpdate(fromdata);
  };
  return (
    <Fragment>
      <AboutNav
        navTitle="Contact and basic info"
        username={profile && profile.username}
      />
      <div className="about-right">
        {email && (
          <div className="single-items flex">
            <img src={mailIcon} className="svg-img" alt="" />

            <p className="text">sabujhasnsarker@gmail.com</p>
          </div>
        )}
        {/* Web */}
        {!website && (
          <div className="add flex">
            <img
              src={addIcon}
              className="svg-img"
              alt=""
              onClick={(e) => setWebtoggle(true)}
            />
            <h3>Add Website</h3>
          </div>
        )}
        <div className="single-items  flex">
          {website && <img src={webIcon} className="svg-img" alt="" />}
          {webtoggle ? (
            <Fragment>
              {!website && <img src={webIcon} className="svg-img" alt="" />}
              <form className="form" onSubmit={onsubmite}>
                <div className="form-group">
                  <input
                    type="url"
                    value={fromdata.website}
                    placeholder="Enter your web url"
                    name="website"
                    onChange={(e) => onchange(e)}
                  />
                </div>
                <div className="edit-delete flex">
                  <p
                    className="text"
                    onClick={(e) => {
                      onsubmite(e);
                      setWebtoggle(false);
                    }}
                  >
                    Save
                  </p>
                  <p className="text" onClick={(e) => setWebtoggle(false)}>
                    Cancel
                  </p>
                </div>
              </form>
            </Fragment>
          ) : (
            website && (
              <Fragment>
                <p className="text">{website}</p>
                {username === profile.username && (
                  <img
                    src={editIcon}
                    onClick={(e) => setWebtoggle(true)}
                    className="svg-img edit-icon"
                    alt=""
                  />
                )}
              </Fragment>
            )
          )}
        </div>
        {/* User */}
        <div className="single-items flex">
          <img src={avatarIcon} className="svg-img" alt="" />
          <Link className="text" to={`/${profile.username}`}>
            {window.location.origin}/{profile.username}
          </Link>
        </div>
        <hr />
        <div className="single">
          {!social && username === profile.username && (
            <div className="add flex">
              <img
                src={addIcon}
                className="svg-img"
                alt=""
                onClick={(e) => setSocialtoggle(true)}
              />
              <h3>Add Social</h3>
            </div>
          )}
          {/* Social icon */}
          <div className="single-items social-input flex">
            {socialtoggle ? (
              <form className="form" onSubmit={onsubmite}>
                <div className="social">
                  <div className="form-group d-flex">
                    <img src={twtter} alt="" className="svg-img" />
                    <input
                      type="url"
                      value={twitter}
                      placeholder="Enter your twitter url"
                      name="twitter"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="form-group d-flex">
                    <img src={fb} alt="" className="svg-img" />
                    <input
                      type="url"
                      value={facebook}
                      placeholder="Enter your facebook url"
                      name="facebook"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="form-group d-flex">
                    <img src={lndin} alt="" className="svg-img" />
                    <input
                      type="url"
                      value={linkedin}
                      placeholder="Enter your linkedin url"
                      name="linkedin"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="form-group d-flex">
                    <img src={inst} alt="" className="svg-img" />
                    <input
                      type="url"
                      value={instagram}
                      placeholder="Enter your instagram url"
                      name="instagram"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="form-group d-flex">
                    <img src={utube} alt="" className="svg-img" />
                    <input
                      type="url"
                      value={youtube}
                      placeholder="Enter your youtube url"
                      name="youtube"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                </div>
                <div className="edit-delete flex m-l-55">
                  <p
                    className="text"
                    onClick={(e) => {
                      onsubmite(e);
                      setSocialtoggle(false);
                    }}
                  >
                    Save
                  </p>
                  <p className="text" onClick={(e) => setSocialtoggle(false)}>
                    Cancel
                  </p>
                </div>
              </form>
            ) : (
              <Fragment>
                {social && (
                  <Fragment>
                    <div className="single-items">
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
                        </ul>
                      </div>
                    </div>
                    {username === profile.username && (
                      <img
                        src={editIcon}
                        onClick={(e) => setSocialtoggle(true)}
                        className="svg-img edit-icon"
                        alt=""
                      />
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { profileUpdate })(Contact);
