import React, { useState } from "react";

import cameraIcon from "../../icons/camera.svg";
import cross from "../../icons/cross.svg";

const PostFrom = () => {
  const [toggle, setToggle] = useState(false);
  const [image, setImage] = useState(true);
  return (
    <div className={`${toggle && "popup popup-post-form"} shadow`}>
      <div className={`post-from-container ${toggle && "popup-content"}`}>
        <div className={`post-from-header `}>
          <p className="text">Create post</p>
        </div>

        <form className="form">
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
          <div className="form-group d-flex">
            <img
              className="userimage"
              src="/uploads/2017-03-20-18-36-07-721.jpg"
              alt=""
              className="user-head-image"
            />
            <textarea
              onClick={(e) => setToggle(true)}
              placeholder="What’s on your mind Sabuj Hasan Sarker"
            />
          </div>
        </form>
        <div className="post-from-footer d-flex">
          <div className="file-input">
            <input
              type="file"
              name="file-input"
              id="file-input"
              className="file-input__input"
            />
            <label className="file-input__label" htmlFor="file-input">
              <img src={cameraIcon} className="svg-img" alt="" />
            </label>
          </div>
          {toggle && (
            <div className="form-group float-right d-flex">
              <input
                type="button"
                onClick={(e) => setToggle(false)}
                value="Post"
                className="btn btn-save "
              />
              <input
                type="button"
                onClick={(e) => setToggle(false)}
                value="Cancel"
                className="btn "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFrom;
