import axios from "axios";

import {
  GET_PROFILE_BY_USERNAME,
  PROFILE_UPDATE,
  GET_PROFILE_ERROR,
  PROFILE_UPDATE_ERROR,
  SET_CURRENT,
  REMOVE_CURRENT,
  UPDATE_EDU,
  ADD_EDU,
  DELETE_EDU,
  CLARE_PROFILE,
  GET_REPOS,
  GET_USER,
  GET_POST_BY_USERNAME,
} from "./Type";

import { setAlert } from "./alert";

export const getprofilebyusername = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/${username}`);
    dispatch({ type: GET_PROFILE_BY_USERNAME, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROFILE_ERROR });
  }
};

// Profile update
export const profileUpdate = (fromdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromdata);

  try {
    const res = await axios.post("/profile/create-profile", body, config);

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data,
    });
    const getUser = await axios.get("/user");
    dispatch({
      type: GET_USER,
      payload: getUser.data,
    });
    const getUserpost = await axios.get(`/post/${res.data.username}`);
    dispatch({
      type: GET_POST_BY_USERNAME,
      payload: getUserpost.data,
    });
  } catch (err) {
    err.response &&
      err.response.data.errors.map((e) => dispatch(setAlert(e.msg, "danger")));
    dispatch({
      type: PROFILE_UPDATE_ERROR,
    });
  }
};

// set current
export const getCurrent = (e) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: e,
  });
};

// REMOVE CURRENT
export const removeCurrent = () => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT,
  });
};

// update educaion
export const updateEducaion = (id, fromdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromdata);

  try {
    const res = await axios.put(`/profile/education/${id}`, body, config);
    dispatch({
      type: UPDATE_EDU,
      payload: res.data,
    });
    dispatch(setAlert("Update Education Successfully", "success"));
  } catch (err) {
    err.response.data.errors &&
      dispatch(setAlert(err.response.data.errors.msg, "danger"));
  }
};

// ADD Educaion
export const addEducaion = (fromdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromdata);
  try {
    const res = await axios.put(`/profile/education`, body, config);
    dispatch({
      type: ADD_EDU,
      payload: res.data,
    });
    dispatch(setAlert("Add Education Successfully", "success"));
  } catch (err) {
    err.response.data.errors &&
      err.response.data.errors.map((e) => {
        dispatch(setAlert(e.msg, "danger"));
      });
  }
};

// update educaion
export const deleteEducaion = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/education/${id}`);
    dispatch({
      type: DELETE_EDU,
      payload: res.data,
    });
    dispatch(setAlert("Delete Education", "success"));
  } catch (err) {}
};

// ADD Experience
export const addExperience = (fromdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromdata);
  try {
    const res = await axios.put(`/profile/experience`, body, config);
    dispatch({
      type: ADD_EDU,
      payload: res.data,
    });
    dispatch(setAlert("Add Experience Successfully", "success"));
  } catch (err) {
    err.response.data.errors &&
      err.response.data.errors.map((e) => {
        dispatch(setAlert(e.msg, "danger"));
      });
  }
};

// update Experience
export const editExperience = (id, fromdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromdata);

  try {
    const res = await axios.put(`/profile/experience/${id}`, body, config);

    dispatch({
      type: UPDATE_EDU,
      payload: res.data,
    });
    dispatch(setAlert("Add Experience Successfully", "success"));
  } catch (err) {
    err.response.data.errors &&
      err.response.data.errors.map((e) => {
        dispatch(setAlert(e.msg, "danger"));
      });
  }
};

// delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/experience/${id}`);
    dispatch({
      type: DELETE_EDU,
      payload: res.data,
    });
    dispatch(setAlert("Delete Experience", "success"));
  } catch (err) {}
};

export const clearProfile = () => (dispatch) => {
  dispatch({
    type: CLARE_PROFILE,
  });
};

// GET_REPOS
export const getrepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
    dispatch(getprofilebyusername());
  } catch (err) {
    dispatch({
      type: GET_PROFILE_ERROR,
    });
  }
};

export const deletePic = (path) => async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ picPath: path });
  console.log(body);
  await axios.post(`/remove`, body, config);
};
