import axios from "axios";

import { GET_PROFILE_BY_USERNAME, PROFILE_UPDATE } from "./Type";

export const getprofilebyusername = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/${username}`);
    dispatch({ type: GET_PROFILE_BY_USERNAME, payloade: res.data });
  } catch (err) {}
};

// Profile update
export const profileUpdate = (fromdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(fromdata);
  console.log(body);
  try {
    const res = await axios.post("/profile/create-profile", body, config);
    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {}
};
