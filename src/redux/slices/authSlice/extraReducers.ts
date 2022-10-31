import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import { Status } from "../../types";
import { ILoginData, IRegisterData } from "./types";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: ILoginData) => {
    const { data } = await axios.post("/auth/login", params);
    console.log(data);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: IRegisterData) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const extraReducers = (builder) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  builder.addCase(fetchAuth.pending, (state) => {
    state.data = null;
    state.status = Status.LOADING;
  }),
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    }),
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    }),
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
    }),
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    }),
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    }),
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
    }),
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    }),
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    });
};
