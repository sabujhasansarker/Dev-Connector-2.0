import { SET_POPUP, REMOVE_POPUP } from "./Type";
export const setPopup = () => (dispatch) => {
  console.log("ok");
  dispatch({
    type: SET_POPUP,
  });
};
export const removePopup = () => (dispatch) => {
  dispatch({
    type: REMOVE_POPUP,
  });
};
