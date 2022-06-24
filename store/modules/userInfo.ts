import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfoState = {
  accessToken: string;
  isEmailVerified: boolean;
  membershipLevel: number;
};

const initialState: UserInfoState = {
  accessToken: "",
  isEmailVerified: true,
  membershipLevel: 0,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    validateEmailVerification: (state) => {
      state.isEmailVerified = true;
    },
    invalidateEmailVerification: (state) => {
      state.isEmailVerified = false;
    },
    changeMembershipLevel: (
      state,
      actions: PayloadAction<{ data: number }>
    ) => {
      state.membershipLevel = actions.payload.data;
    },
    setAccessToken: (state, actions: PayloadAction<{ data: string }>) => {
      state.accessToken = actions.payload.data;
    },
  },
});

const { reducer, actions } = userInfoSlice;
export const {
  validateEmailVerification,
  invalidateEmailVerification,
  changeMembershipLevel,
  setAccessToken,
} = actions;
export default reducer;
