import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";

import { getSinglePost } from "../../action/post";

import love from "../../icons/love.svg";
import loveTrue from "../../icons/360.svg";
import comm from "../../icons/comment.svg";
import Comments from "./Comments";

import moment from "moment";

// funtion
import { deletePost, setCurrent, likePost } from "../../action/post";
import { deletePic } from "../../action/profile";

const SinglePage = ({
  getSinglePost,
  match,
  post: { post, loading },
  auth,
  likePost,
  deletePost,
  setCurrent,
}) => {
  useEffect(() => {
    getSinglePost(match.params.postId);
  }, [getSinglePost]);

  const [dot, setDot] = useState(false);
  const { user, body, thumbnail, date, likes, comments } = post ? post : "";
  const { firstName, lastName, profilePic, username } = user ? user : "";
  const { _id } = auth ? auth : "";

  if (loading) {
    return <Spnnier />;
  }

  return (
    <div className="posts shadow">
      <div className="headr-flex">
        <Link to={`/${username}`}>
          <div className="header">
            <img className="user-head-image" src={profilePic} alt="" />
            <div className="user-head">
              <h4>{firstName + " " + lastName}</h4>
              <p>{moment(date).fromNow()}</p>
            </div>
          </div>
        </Link>
        {post && post.user._id === _id && (
          <div className="dot-container">
            <p className="dot" onClick={(e) => setDot(!dot)}>
              ...
            </p>
            {dot && (
              <div className="dot-body">
                <p onClick={(e) => setCurrent(post)}>Edit</p>
                <p
                  onClick={(e) => {
                    deletePic(thumbnail);
                    deletePost(post._id);
                  }}
                >
                  Delete
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-body">
        {thumbnail && thumbnail && (
          <img src={thumbnail} className="post-thumbli" alt="" />
        )}
        <p className="text">{body}</p>
        <div className="total d-flex">
          <div className="like ">
            {likes &&
            likes.filter((item) => item.user.toString() === _id).length > 0 ? (
              <img
                src={loveTrue}
                className="svg-img"
                alt=""
                onClick={(e) => likePost(post._id)}
              />
            ) : (
              <img
                src={love}
                className="svg-img"
                alt=""
                onClick={(e) => likePost(post._id)}
              />
            )}

            <p>{post && likes.length}</p>
          </div>
          <div className="comment ">
            <img src={comm} className="svg-img" alt="" />
            <p>{post && comments.length}</p>
          </div>
        </div>
        <Comments comments={comments} postId={post && post._id} userId={_id} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth.user,
});

export default connect(mapStateToProps, {
  getSinglePost,
  deletePost,
  setCurrent,
  likePost,
  deletePic,
})(SinglePage);
