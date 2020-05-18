import { combineReducers } from "redux";

import auth from "./auth";
import alert from "./alert";
import profile from "./profile";
import popup from "./popup";
import post from "./post";

export default combineReducers({ auth, profile, alert, popup, post });
