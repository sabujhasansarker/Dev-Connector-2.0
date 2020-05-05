import {
  LOGIN,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_ERROR,
  GET_USER,
  GET_USER_ERROR,
  LOGOUT,
} from "../action/Type";

const initialState = {
  user: null,
  isAutination: false,
  loading: true,
  usertoken: localStorage.getItem("usertoken"),
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        isAutination: true,
        loading: false,
      };
    case LOGIN:
    case REGISTER:
      localStorage.setItem("usertoken", payload.usertoken);
      return {
        ...state,
        ...payload,
        isAutination: true,
        loading: false,
        usertoken: localStorage.getItem("usertoken"),
      };
    case GET_USER_ERROR:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case LOGOUT:
      localStorage.removeItem("usertoken");
      return {
        ...state,
        loading: false,
        isAutination: false,
        usertoken: localStorage.removeItem("usertoken"),
      };
    default:
      return state;
  }
};
