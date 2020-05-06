import axios from "axios";

import { GET_PROFILE_BY_USERNAME } from "./Type";

export const getprofilebyusername = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/${username}`);
    dispatch({ type: GET_PROFILE_BY_USERNAME, payloade: res.data });
  } catch (err) {}
};
