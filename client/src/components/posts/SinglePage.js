import React, { useEffect, Fragment, useState } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";

import { getSinglePost } from "../../action/post";

import love from "../../icons/love.svg";
import loveTrue from "../../icons/360.svg";
import comm from "../../icons/comment.svg";
import Comments from "./Comments";
import Notfound from "../layouts/Notfound";

import moment from "moment";

// funtion
import { deletePost, setCurrent, likePost } from "../../action/post";
import { deletePic } from "../../action/profile";
import PostFrom from "./PostFrom";

const SinglePage = ({
  getSinglePost,
  match,
  post: { post, loading, current },
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

  if (!post) {
    return <Spnnier />;
  }

  if (post) {
    if (post && post._id !== match.params.postId)
      return <Route component={Notfound} />;
  }

  return (
    <div className="container">
      {current && <PostFrom user={auth && auth} />}
      <div className="posts shadow">
        <div className="headr-flex">
          <Link to={`/${username && username}`}>
            <div className="header">
              <img
                className="user-head-image"
                src={profilePic && profilePic}
                alt=""
              />
              <div className="user-head">
                <h4>{firstName + " " + lastName}</h4>
                <p>{moment(post && date).fromNow()}</p>
              </div>
            </div>
          </Link>
          {post && post.user && post.user._id === _id && (
            <div className="dot-container">
              <p className="dot" onClick={(e) => setDot(!dot)}>
                ...
              </p>
              {dot && (
                <div className="dot-body">
                  <p onClick={(e) => setCurrent(post && post)}>Edit</p>
                  <Link
                    to="/"
                    onClick={(e) => {
                      deletePic(thumbnail);
                      deletePost(post && post._id);
                    }}
                  >
                    Delete
                  </Link>
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
              likes.filter((item) => item.toString() === _id).length > 0 ? (
                <img
                  src={loveTrue}
                  className="svg-img"
                  alt=""
                  onClick={(e) => likePost(post && post._id)}
                />
              ) : (
                <img
                  src={love}
                  className="svg-img"
                  alt=""
                  onClick={(e) => likePost(post && post._id)}
                />
              )}

              <p>{post && post.likes && likes.length}</p>
            </div>
            <div className="comment ">
              <img src={comm} className="svg-img" alt="" />
              <p>{post && post.comments && comments.length}</p>
            </div>
          </div>
          <Comments
            comments={comments}
            postId={post && post._id}
            userId={_id}
          />
        </div>
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
