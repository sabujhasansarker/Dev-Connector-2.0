import axios from "axios";

import {
  LOGIN_ERROR,
  LOGIN,
  REGISTER,
  REGISTER_ERROR,
  GET_USER_ERROR,
  GET_USER,
  LOGOUT,
} from "./Type";

import { setAlert } from "./alert";

import setAuthToken from "../utils/setAuthToken";

// get user by id

export const loadUser = () => async (dispatch) => {
  if (localStorage.usertoken) {
    setAuthToken(localStorage.usertoken);
  }

  try {
    const res = await axios.get("/user");
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_USER_ERROR });
  }
};

// login user
export const login = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/user/login", body, config);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    dispatch(setAlert("Login Successfully", "success"));
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.errors.msg, "danger"));
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Register user
export const register = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/user/register", body, config);
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
    dispatch(setAlert("Register Successfully", "success"));
    dispatch(loadUser());
  } catch (err) {
    err.response.data.errors.map((e) => {
      dispatch(setAlert(e.msg, "danger"));
      dispatch({
        type: REGISTER_ERROR,
      });
    });
  }
};
