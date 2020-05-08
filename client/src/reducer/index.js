import { combineReducers } from "redux";

import auth from "./auth";
import alert from "./alert";
import profile from "./profile";
import popup from "./popup";

export default combineReducers({ auth, profile, alert, popup });
