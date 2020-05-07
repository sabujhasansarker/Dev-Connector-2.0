import axios from "axios";

import {
  GET_PROFILE_BY_USERNAME,
  PROFILE_UPDATE,
  GET_PROFILE_ERROR,
  PROFILE_UPDATE_ERROR,
} from "./Type";

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
  console.log(body);
  try {
    const res = await axios.post("/profile/create-profile", body, config);

    // dispatch(getprofilebyusername(fromdata.username));
    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_UPDATE_ERROR,
    });
  }
};
