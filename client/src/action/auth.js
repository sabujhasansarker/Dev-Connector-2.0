import axios from "axios";

import { LOGIN_ERROR, LOGIN, REGISTER, REGISTER_ERROR } from "./Type";

import { setAlert } from "./alert";

// login user
export const login = ({ data }) => async (dispatch) => {
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
  } catch (err) {
    dispatch(setAlert(err.response.data.errors.msg, "danger"));
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

// Register user
export const register = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  console.log(body);
  try {
    const res = await axios.post("/user/register", body, config);
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
    dispatch(setAlert("Register Successfully", "success"));
  } catch (err) {
    err.response.data.errors.map((e) => {
      dispatch(setAlert(e.msg, "danger"));
      dispatch({
        type: REGISTER_ERROR,
      });
    });
  }
};
