import React, { useState, Fragment, useEffect } from "react";

import AboutNav from "./AboutNav";

import editIcon from "../../../../icons/edit.svg";
import git from "../../../../icons/git.svg";
import addIcon from "../../../../icons/add.svg";

import { profileUpdate, getrepos } from "../../../../action/profile";
import { connect } from "react-redux";

const Github = ({
  profile,
  username: { username },
  profileUpdate,
  repos,
  getrepos,
}) => {
  useEffect(() => {
    getrepos(profile && profile.githubusername);
  }, [getrepos]);
  const [gittoggle, setGittoggle] = useState(false);

  let { githubusername, social, website } = profile ? profile : "";

  const [fromdata, setFromdata] = useState({
    skills: profile && profile ? profile.skills.join(",") : "",
    status: profile && profile ? profile.status : "",
    githubusername: profile && profile ? githubusername : "",
    facebook: social && social.facebook ? social.facebook : "",
    instagram: social && social.instagram ? social.instagram : "",
    linkedin: social && social.linkedin ? social.linkedin : "",
    twitter: social && social.twitter ? social.twitter : "",
    youtube: social && social.youtube ? social.youtube : "",
    website: website ? website : "",
  });

  const onchange = (e) =>
    setFromdata({ ...fromdata, [e.target.name]: e.target.value });
  const onsubmit = (e) => {
    e.preventDefault();
    profileUpdate(fromdata);
    getrepos(fromdata && fromdata.githubusername);
  };
  console.log(repos);
  return (
    <Fragment>
      <AboutNav navTitle="Github" />
      <div className="about-right">
        {!githubusername && (
          <div className="add flex">
            <img
              src={addIcon}
              className="svg-img"
              alt=""
              onClick={(e) => setGittoggle(true)}
            />
            <h3>Add Github</h3>
          </div>
        )}
        <div className="single-items flex">
          {githubusername && <img src={git} className="svg-img" alt="" />}
          {gittoggle ? (
            <Fragment>
              {!githubusername && <img src={git} className="svg-img" alt="" />}
              <form className="form" onSubmit={onsubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={(e) => onchange(e)}
                    name="githubusername"
                    value={fromdata.githubusername}
                    placeholder="Enter your github username"
                  />
                </div>
                <div className="edit-delete flex">
                  <p
                    className="text"
                    onClick={(e) => {
                      onsubmit(e);
                      setGittoggle(false);
                    }}
                  >
                    Save
                  </p>
                  <p className="text" onClick={(e) => setGittoggle(false)}>
                    Cancel
                  </p>
                </div>
              </form>
            </Fragment>
          ) : (
            githubusername && (
              <Fragment>
                <p className="text">
                  http://github.com/{fromdata.githubusername}
                </p>
                <img
                  src={editIcon}
                  onClick={(e) => setGittoggle(true)}
                  className="svg-img edit-icon"
                  alt=""
                />
              </Fragment>
            )
          )}
        </div>
        <hr />
        {/* Git repos */}
        {repos && (
          <div className="git-repos">
            <h1 className="text-center">Github Repos</h1>
            {repos.map((repo) => (
              <div className="git-single flex">
                <div className="git-left">
                  <h3>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <br />
                  <p className="text">{repo.description}</p>
                </div>
                <div className="git-right">
                  <p className="btn-save">Star : {repo.stargazers_count} </p>
                  <p className="btn">Watchers : {repo.watchers_count} </p>
                  <p className="btn">Forks : {repo.forks_count} </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { profileUpdate, getrepos })(Github);
