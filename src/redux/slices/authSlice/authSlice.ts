import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";
import { IUserData } from "./types";
import { Status } from "../../types";

interface IInitialState {
  data: IUserData | null;
  status: Status;
}

const initialState: IInitialState = {
  data: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: extraReducers,
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
