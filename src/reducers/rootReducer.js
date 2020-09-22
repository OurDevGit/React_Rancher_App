import { combineReducers } from "redux";

import settings from "./settings";
import language from "./language";
import user from "./user";

const appReducer = combineReducers({ settings, language, user });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
