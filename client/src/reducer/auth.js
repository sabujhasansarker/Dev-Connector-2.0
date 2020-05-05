import { LOGIN, LOGIN_ERROR, REGISTER, REGISTER_ERROR } from "../action/Type";

const initialState = {
  user: null,
  isAutination: false,
  loading: true,
  usertoken: null,
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
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
    case LOGIN_ERROR:
    case REGISTER_ERROR:
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
