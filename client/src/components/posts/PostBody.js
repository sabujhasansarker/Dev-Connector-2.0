import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import love from "../../icons/love.svg";
import comm from "../../icons/comment.svg";
import Comments from "./Comments";

import moment from "moment";

const PostBody = ({ posts, user: { username, _id } }) => {
  const { user, body, thumbnail, date } = posts && posts;
  const { firstName, lastName, profilePic } = user && user;
  return (
    <div className="posts shadow">
      <Link to={`/${user.username}`}>
        <div className="header">
          <img className="user-head-image" src={profilePic} alt="" />
          <div className="user-head">
            <h4>{firstName + " " + lastName}</h4>
            <p>{moment(date).startOf("hour").fromNow()}</p>
          </div>
        </div>
      </Link>
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

export default PostBody;
