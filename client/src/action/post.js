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
  CLEARE_POSTS,
  CLEARE_USER_POST,
  CURRENT_POST,
} from "./Type";
import { setAlert } from "./alert";

// Cleare post
export const clearPosts = () => async (dispatch) => {
  try {
    dispatch({ type: CLEARE_POSTS });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const clearPostsByUsername = () => async (dispatch) => {
  try {
    dispatch({ type: CLEARE_USER_POST });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get all post
export const getAllPosts = () => async (dispatch) => {
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
export const getPostByUser = (username) => async (dispatch) => {
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
export const createPost = (fromData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);

  try {
    const res = await axios.post("/post", body, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_POST_ERROR,
    });
  }
};

// Current
export const setCurrent = (fromData) => (dispatch) => {
  dispatch({ type: CURRENT_POST, payload: fromData });
};

// Edit Post
export const editPost = (fromData, postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.put(`/post/edit/${postId}`, body, config);
    dispatch({
      type: EDIT_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_ERROR });
  }
};

// delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/delete/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
    dispatch(setAlert("Delete Post", "danger"));
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

// Like
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/like/${postId}`);
    dispatch({
      type: LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

// comment
export const createComment = (postId, fromData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.put(`/post/comment/${postId}`, body, config);
    dispatch({
      type: COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_ERROR });
  }
};

// delete comment
export const deleteComment = (postId, comment_id) => async (dispatch) => {
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
export const createReplay = (postId, commentId, fromData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromData);
  try {
    const res = await axios.put(
      `/post/${postId}/comment/${commentId}/replay`,
      body,
      config
    );
    dispatch({
      type: REPLAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_ERROR });
  }
};

// delete replay
export const deleteReplay = (postId, comment_id, replay_id) => async (
  dispatch
) => {
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
