import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isAuthenticated: boolean;
  isRefreshTokenValid: boolean;
  accessToken: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  //to prevent login modal to show everytime user visits secure content,
  //we set the refresh token valid to true initially
  isRefreshTokenValid: true,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    validateAuthentication: (
      state,
      actions: PayloadAction<{ accessToken: string }>
    ) => {
      state.isAuthenticated = true;
      state.isRefreshTokenValid = true;
      state.accessToken = actions.payload.accessToken;
    },
    expireAuthentication: (state) => {
      state.isRefreshTokenValid = false;
    },
    initializeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.isRefreshTokenValid = false;
      state.accessToken = null;
    },
  },
});

const { reducer, actions } = authSlice;
export const {
  validateAuthentication,
  expireAuthentication,
  initializeAuthentication,
} = actions;
export default reducer;
