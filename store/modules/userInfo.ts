import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfoState = {
  isEmailVerified: boolean;
  membershipLevel: number | null;
};

const initialState: UserInfoState = {
  isEmailVerified: false,
  membershipLevel: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      actions: PayloadAction<{
        isEmailVerified: boolean;
        membershipLevel: number;
      }>
    ) => {
      state.isEmailVerified = actions.payload.isEmailVerified;
      state.membershipLevel = actions.payload.membershipLevel;
    },
    initializeInfo: (state) => {
      state.isEmailVerified = false;
      state.membershipLevel = null;
    },
  },
});

const { reducer, actions } = userInfoSlice;
export const { setUserInfo, initializeInfo } = actions;
export default reducer;
