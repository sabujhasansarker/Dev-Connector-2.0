import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import love from "../../icons/love.svg";
import comm from "../../icons/comment.svg";
import Comments from "./Comments";

import moment from "moment";

// funtion
import { deletePost, setCurrent } from "../../action/post";

const PostBody = ({
  posts,
  user: { username, _id },
  deletePost,
  setCurrent,
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
              <p>{moment(date).startOf("hour").fromNow()}</p>
            </div>
          </div>
        </Link>
        <p className="dot" onClick={(e) => setDot(!dot)}>
          ...
        </p>
        {dot && (
          <div className="dot-body">
            <p onClick={(e) => setCurrent(posts)}>Edit</p>
            <p onClick={(e) => deletePost(posts._id)}>Delete</p>
          </div>
        )}
      </div>
      <div className="post-body">
        <p className="text">
          {body.length > 200 ? (
            <Fragment>
              {body.substring(0, 200)}
              <span>
                <Link to={`/post/${posts._id}`}>read more .......</Link>
              </span>
            </Fragment>
          ) : (
            body
          )}
        </p>
        <div className="total d-flex">
          <div className="like ">
            <img src={love} className="svg-img" alt="" />
            <p>56</p>
          </div>
          <div className="comment ">
            <img src={comm} className="svg-img" alt="" />
            <p>56</p>
          </div>
        </div>
        <Comments />
      </div>
    </div>
  );
};

export default connect(null, { deletePost, setCurrent })(PostBody);
