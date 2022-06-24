import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  isRefreshTokenValid: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isRefreshTokenValid: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    validateAuthentication: (state) => {
      state.isAuthenticated = true;
    },
    invalidateAuthentication: (state) => {
      state.isAuthenticated = false;
    },
    validateRefreshToken: (state) => {
      state.isRefreshTokenValid = true;
    },
    invalidateRefreshToken: (state) => {
      state.isRefreshTokenValid = false;
    },
    initializeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.isRefreshTokenValid = false;
    },
  },
});

const { reducer, actions } = authSlice;
export const {
  validateAuthentication,
  invalidateAuthentication,
  invalidateRefreshToken,
  validateRefreshToken,
  initializeAuthentication,
} = actions;
export default reducer;
