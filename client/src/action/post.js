import axios from "axios";
import {
  GET_ALL_POSTS,
  POST_ERROR,
  GET_POST_BY_USERNAME,
  CREATE_POST,
  CREATE_POST_ERROR,
  EDIT_POST,
  DELETE_POST,
  LIKE,
  COMMENTS,
  REPLAY,
  DELETE_COMMENT,
  DELETE_REPLAY,
} from "./Type";

// Get all post
exports.getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/post");
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get post by username
exports.getPostByUser = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/post/${username}`);
    dispatch({
      type: GET_POST_BY_USERNAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// create profile
exports.createProfile = (fromData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.post("/post", body, config);
    dispatch({
      type: CREATE_POST,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_POST_ERROR,
    });
  }
};

// Edit Post
exports.editPost = (fromData, postId) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.post(`/post/edit/${postId}`, body, config);
    dispatch({
      type: EDIT_POST,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_ERROR });
  }
};

// delete post
exports.deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/delete/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

// Like
exports.likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/like/${postId}`);
    dispatch({
      type: LIKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

// comment
exports.createComment = (postId, fromData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.put(`/post/comment/${postId}`, body, config);
    dispatch({
      type: COMMENTS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_ERROR });
  }
};

// delete comment
exports.deleteComment = (postId, comment_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/${postId}/comment/${comment_id}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

// replay
exports.createReplay = (postId, commentId, fromData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.put(
      `/post/${postId}/comment/${comment_id}/replay`,
      body,
      config
    );
    dispatch({
      type: REPLAY,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_ERROR });
  }
};

// delete replay
exports.deleteComment = (postId, comment_id, replay_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/post/${postId}/comment/${comment_id}/replay/${replay_id}`
    );
    dispatch({
      type: DELETE_REPLAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};
