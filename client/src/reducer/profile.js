import {
  GET_PROFILE_BY_USERNAME,
  PROFILE_UPDATE,
  GET_USER_ERROR,
  PROFILE_UPDATE_ERROR,
  GET_PROFILE_ERROR,
} from "../action/Type";

const inisialState = {
  profile: null,
  profiles: null,
  loading: true,
  error: null,
};

export default (state = inisialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE_BY_USERNAME:
    case PROFILE_UPDATE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: true,
        error: payload,
      };
    default:
      return state;
  }
};
