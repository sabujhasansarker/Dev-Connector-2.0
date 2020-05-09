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

    // dispatch(getprofilebyusername(fromdata.username));
    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    err.response && dispatch(setAlert(err.response.data.errors.msg, "danger"));
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
    err.response.data.errors.map((e) => {
      dispatch(setAlert(e.msg, "danger"));
    });
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
  console.log(body);
  try {
    const res = await axios.put(`/profile/education`, body, config);
    dispatch({
      type: ADD_EDU,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(setAlert("Add Education Successfully", "success"));
  } catch (err) {
    console.log(err.response);
    // err.response.data.errors.map((e) => {
    //   dispatch(setAlert(e.msg, "danger"));
    // });
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
