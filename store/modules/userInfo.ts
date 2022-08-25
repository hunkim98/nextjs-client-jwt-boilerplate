import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../dto/entities/user";

export type UserInfoState = {
  isEmailVerified: boolean;
  role: Role | null;
  name: string;
  email: string;
  telephone: string;
};

const initialState: UserInfoState = {
  isEmailVerified: false,
  role: null,
  name: "",
  email: "",
  telephone: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      actions: PayloadAction<{
        isEmailVerified: boolean;
        role: Role;
        name: string;
        email: string;
        telephone: string;
      }>
    ) => {
      state.isEmailVerified = actions.payload.isEmailVerified;
      state.role = actions.payload.role;
      state.email = actions.payload.email;
      state.name = actions.payload.name;
      state.telephone = actions.payload.telephone;
    },
    initializeInfo: (state) => {
      state.isEmailVerified = false;
      state.role = null;
      state.email = "";
      state.name = "";
      state.telephone = "";
    },
  },
});

const { reducer, actions } = userInfoSlice;
export const { setUserInfo, initializeInfo } = actions;
export default reducer;
