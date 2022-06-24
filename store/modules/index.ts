import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import userInfo from "./userInfo";

const rootReducer = combineReducers({
  auth,
  userInfo,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
