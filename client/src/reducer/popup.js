import { SET_POPUP, REMOVE_POPUP } from "../action/Type";

const initialState = [];

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_POPUP:
      return payload;
    case REMOVE_POPUP:
      return true;
    default:
      return state;
  }
};
