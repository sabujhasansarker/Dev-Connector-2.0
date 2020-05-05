import axios from "axios";

import { LOGIN_ERROR, LOGIN, REGISTER, REGISTER_ERROR } from "./Type";

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
    console.log(res.data);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.errors);
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};
