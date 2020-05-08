import { SET_POPUP, REMOVE_POPUP } from "../action/Type";

const initialState = false;

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_POPUP:
      return true;
    case REMOVE_POPUP:
      return false;
    default:
      return state;
  }
};
