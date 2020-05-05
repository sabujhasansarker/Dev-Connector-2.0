import { LOGIN, LOGIN_ERROR } from "../action/Type";

const initialState = {
  user: null,
  isAutination: false,
  loading: true,
  usertoken: localStorage.getItem("usertoken"),
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOGIN:
      localStorage.setItem("usertoken", payload.usertoken);
      return {
        ...state,
        ...payload,
        isAutination: true,
        loading: false,
        usertoken: localStorage.getItem("usertoken"),
      };
    case LOGIN_ERROR:
      localStorage.removeItem("usertoken");
      return {
        ...state,
        loading: false,
        isAutination: false,
      };
    default:
      return state;
  }
};
