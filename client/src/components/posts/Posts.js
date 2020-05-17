import React from "react";

import "./Post.css";
import PostFrom from "./PostFrom";

import PostBody from "./PostBody";

const Posts = () => {
  return (
    <div className="container post-container">
      <PostFrom />
      <PostBody />
    </div>
  );
};

export default Posts;
