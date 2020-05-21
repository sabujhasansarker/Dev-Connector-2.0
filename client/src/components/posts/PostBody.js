import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import love from "../../icons/love.svg";
import loveTrue from "../../icons/360.svg";
import comm from "../../icons/comment.svg";
import Comments from "./Comments";

import moment from "moment";

// funtion
import { deletePost, setCurrent, likePost } from "../../action/post";
import { deletePic } from "../../action/profile";

const PostBody = ({
  posts,
  user: { username, _id, profile },
  deletePost,
  setCurrent,
  likePost,
  deletePic,
}) => {
  const [dot, setDot] = useState(false);
  const { user, body, thumbnail, date } = posts && posts;
  const { firstName, lastName, profilePic } = user && user;

  return (
    <div className="posts shadow">
      <div className="headr-flex">
        <Link to={`/${user.username}`}>
          <div className="header">
            <img className="user-head-image" src={profilePic} alt="" />
            <div className="user-head">
              <h4>{firstName + " " + lastName}</h4>
              <p>{moment(date).fromNow()}</p>
            </div>
          </div>
        </Link>
        {posts && posts.user._id === _id && (
          <div className="dot-container">
            <p className="dot" onClick={(e) => setDot(!dot)}>
              ...
            </p>
            {dot && (
              <div className="dot-body">
                <p
                  onClick={(e) => {
                    setCurrent(posts);
                    setDot(false);
                  }}
                >
                  Edit
                </p>
                <p
                  onClick={(e) => {
                    deletePic(thumbnail);
                    deletePost(posts._id);
                    setDot(false);
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
        <p className="text">
          {body.length > 200 ? (
            <Fragment>
              {body.substring(0, 200)}
              <span>
                <Link to={`/post/${posts._id}`}> read more .......</Link>
              </span>
            </Fragment>
          ) : (
            body
          )}
        </p>
        <div className="total d-flex">
          <div className="like ">
            {posts.likes.filter((item) => item.toString() === _id).length > 0
              ? profile && (
                  <img
                    src={loveTrue}
                    className="svg-img"
                    alt=""
                    onClick={(e) => likePost(posts._id)}
                  />
                )
              : profile && (
                  <img
                    src={love}
                    className="svg-img"
                    alt=""
                    onClick={(e) => likePost(posts._id)}
                  />
                )}

            <p>{posts.likes.length}</p>
          </div>
          <div className="comment ">
            <img src={comm} className="svg-img" alt="" />
            <p>{posts && posts.comments.length}</p>
          </div>
        </div>
        <Comments
          comments={posts && posts.comments}
          postId={posts && posts._id}
          userId={_id}
          profile={profile}
        />
      </div>
    </div>
  );
};

export default connect(null, { deletePost, setCurrent, likePost, deletePic })(
  PostBody
);
