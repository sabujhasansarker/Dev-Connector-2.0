import React from "react";
import { Link } from "react-router-dom";

import love from "../../icons/love.svg";
import comm from "../../icons/comment.svg";
import Comments from "./Comments";

const PostBody = () => {
  return (
    <div className="posts shadow">
      <div className="header">
        <img
          className="user-head-image"
          src="/uploads/2017-03-20-18-36-07-721.jpg"
          alt=""
        />
        <div className="user-head">
          <h4>Sabuj Hasan Sarker</h4>
          <p>Just Now</p>
        </div>
      </div>
      <div className="post-body">
        <p className="text">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.{" "}
          <span>
            <Link to="/single-post">read more .......</Link>
          </span>
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
