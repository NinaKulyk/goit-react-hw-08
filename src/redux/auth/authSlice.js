import { createSlice } from "@reduxjs/toolkit";
import { getMeThunk, loginThunk, logoutThunk, registerThunk } from "./authOps";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = true;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(getMeThunk.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.isRefreshing = false;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const authReducer = slice.reducer;
