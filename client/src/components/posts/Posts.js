import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Post.css";
import PostFrom from "./PostFrom";
import PostBody from "./PostBody";

// layout
import Spnnier from "../layouts/Spnnier";

// Funtion
import { getAllPosts, clearPostsByUsername } from "../../action/post";

const Posts = ({ posts: { posts, loading }, userPosts, getAllPosts, user }) => {
  useEffect(() => {
    getAllPosts();
    if (window.location.pathname === "/") {
      clearPostsByUsername();
    }
  }, [getAllPosts]);

  if (loading) {
    return <Spnnier />;
  }
  return (
    <div className="container post-container">
      <PostFrom />
      {userPosts
        ? userPosts.map((post) => <PostBody posts={post} user={user} />)
        : posts.map((post) => <PostBody posts={post} user={user} />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getAllPosts, clearPostsByUsername })(
  Posts
);
