import {
  GET_PROFILE_BY_USERNAME,
  PROFILE_UPDATE,
  GET_USER_ERROR,
  PROFILE_UPDATE_ERROR,
  GET_PROFILE_ERROR,
  SET_CURRENT,
  REMOVE_CURRENT,
  UPDATE_EDU,
  DELETE_EDU,
} from "../action/Type";

const inisialState = {
  profile: null,
  profiles: null,
  loading: true,
  current: null,
  error: null,
};

export default (state = inisialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE_BY_USERNAME:
    case UPDATE_EDU:
    case PROFILE_UPDATE:
    case DELETE_EDU:
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
    case SET_CURRENT:
      return {
        ...state,
        current: payload,
      };
    case REMOVE_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
