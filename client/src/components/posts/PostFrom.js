import React, { useState } from "react";
import { connect } from "react-redux";

import cameraIcon from "../../icons/camera.svg";
import cross from "../../icons/cross.svg";

// Funtion
import { createPost } from "../../action/post";

const PostFrom = ({ createPost, user }) => {
  const [toggle, setToggle] = useState(false);
  const [image, setImage] = useState(true);

  const [fromdata, setFromdata] = useState({ thumbnail: "", body: "" });

  const onChange = (e) => {
    setFromdata({ ...setFromdata, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createPost(fromdata);
    setToggle(false);
    console.log(fromdata);
  };
  return (
    <div className={`${toggle && "popup popup-post-form"} shadow`}>
      <div className={`post-from-container ${toggle && "popup-content"}`}>
        <div className={`post-from-header `}>
          <p className="text">Create post</p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          {toggle && image && (
            <div className="thumbnail">
              <img src="/uploads/2017-03-20-18-36-07-721.jpg" alt="" />
              <img
                src={cross}
                className="svg-img"
                onClick={(e) => setImage(false)}
                alt=""
              />
            </div>
          )}
          <div
            className="form-group d-flex"
            style={!image ? { height: "26vh" } : {}}
          >
            <img
              className="userimage"
              src={user && user.profilePic}
              alt=""
              className="user-head-image"
            />
            <textarea
              onClick={(e) => setToggle(true)}
              name="body"
              onChange={(e) => onChange(e)}
              placeholder="What’s on your mind Sabuj Hasan Sarker"
            />
          </div>
          <div className="post-from-footer d-flex">
            <div className="file-input">
              <input
                type="file"
                name="thumbnail"
                id="file-input"
                className="file-input__input"
                onChange={(e) => onChange(e)}
              />
              <label className="file-input__label" htmlFor="file-input">
                <img src={cameraIcon} className="svg-img" alt="" />
              </label>
            </div>
            {toggle && (
              <div className="float-right d-flex">
                <input type="submit" value="Post" className="btn btn-save " />
                <input
                  type="button"
                  onClick={(e) => setToggle(false)}
                  value="Cancel"
                  className="btn "
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { createPost })(PostFrom);
