import { SET_POPUP, REMOVE_POPUP } from "./Type";
export const setPopup = (data) => (dispatch) => {
  dispatch({
    type: SET_POPUP,
    payload: data,
  });
};
export const removePopup = () => (dispatch) => {
  dispatch({
    type: REMOVE_POPUP,
  });
};
