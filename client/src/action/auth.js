import axios from "axios";

import { LOGIN_ERROR, LOGIN, REGISTER, REGISTER_ERROR } from "./Type";

import { setAlert } from "./alert";

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
  } catch (err) {
    dispatch(setAlert(err.response.data.errors.msg, "danger"));
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};
