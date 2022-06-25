import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import auth, { AuthState } from "./auth";
import userInfo, { UserInfoState } from "./userInfo";

// const rootReducer = combineReducers({
//   auth,
//   userInfo,
// });

export interface RootState {
  auth: AuthState;
  userInfo: UserInfoState;
}

const rootReducer = (
  state: RootState,
  action: AnyAction
): CombinedState<RootState> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        auth,
        userInfo,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
