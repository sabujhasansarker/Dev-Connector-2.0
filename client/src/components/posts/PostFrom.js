import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";

import cameraIcon from "../../icons/camera.svg";
import cross from "../../icons/cross.svg";

// Funtion
import { createPost, editPost } from "../../action/post";
import { deletePic } from "../../action/profile";

const PostFrom = ({ createPost, user, current, editPost, deletePic }) => {
  const [toggle, setToggle] = useState(false);
  const oldPic = current && current.thumbnail ? current.thumbnail : "";
  const [fromdata, setFromdata] = useState({
    thumbnail: current ? current.thumbnail : "",
    body: current ? current.body : "",
  });
  useEffect(() => {
    setToggle(current ? true : false);
    setFromdata({
      thumbnail: current ? current.thumbnail : "",
      body: current ? current.body : "",
    });
  }, [current]);

  // uploade image
  const file = useRef("");
  const fileChange = async (e) => {
    e.preventDefault();
    let fileData = file.current.files[0];
    // setFile(e.target.files[0]);
    if (fileData) {
      const formData = new FormData();
      formData.append("file", fileData);
      try {
        const res = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFromdata({ ...fromdata, thumbnail: res.data.filePath });
      } catch (err) {
        if (err.response.status === 500) {
          console.log("There was a problem with the server");
        } else {
          console.log(err.response.data.msg);
        }
      }
    }
  };

  const onChange = (e) => {
    setFromdata({ thumbnail: fromdata.thumbnail, body: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setToggle(false);
    if (current) {
      editPost(fromdata, current && current._id);
      return setFromdata({ thumbnail: "", body: "" });
    }
    createPost(fromdata);
    console.log(fromdata);
    setFromdata({ thumbnail: "", body: "" });
  };
  return (
    <div className={`${toggle && "popup popup-post-form"} shadow`}>
      <div className={`post-from-container ${toggle && "popup-content"}`}>
        <div className={`post-from-header `}>
          <p className="text">Create post</p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          {toggle && fromdata.thumbnail && (
            <div className="thumbnail">
              <img src={fromdata.thumbnail} alt="" />
              <img
                src={cross}
                className="svg-img"
                onClick={(e) => {
                  setFromdata({ ...fromdata, thumbnail: "" });
                  deletePic(fromdata.thumbnail);
                }}
                alt=""
              />
            </div>
          )}
          <div
            className="form-group d-flex"
            style={!fromdata.thumbnail ? { height: "height: 136px" } : {}}
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
              value={fromdata.body}
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
                ref={file}
                onChange={fileChange}
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

const mapStateToProps = (state) => ({
  current: state.post.current,
});

export default connect(mapStateToProps, { createPost, editPost, deletePic })(
  PostFrom
);
