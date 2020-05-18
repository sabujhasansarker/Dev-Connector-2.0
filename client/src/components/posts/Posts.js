import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Post.css";
import PostFrom from "./PostFrom";
import PostBody from "./PostBody";

// layout
import Spnnier from "../layouts/Spnnier";

// Funtion
import { getAllPosts } from "../../action/post";

const Posts = ({
  posts: { posts, loading },
  userPosts,
  getAllPosts,
  user,
  profile,
}) => {
  useEffect(() => {
    window.location.pathname === "/" && getAllPosts();
  }, [getAllPosts]);

  if (loading) {
    return <Spnnier />;
  }
  return (
    <div className="container post-container">
      {userPosts && userPosts
        ? profile &&
          profile.username === user.username && <PostFrom user={user} />
        : user && user.profile && <PostFrom user={user} />}
      {userPosts && userPosts
        ? userPosts &&
          userPosts.map((post) => (
            <PostBody posts={post} user={user} key={post._id} />
          ))
        : posts &&
          posts.map((post) => (
            <PostBody posts={post} user={user} key={post._id} />
          ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post,
  user: state.auth.user,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
