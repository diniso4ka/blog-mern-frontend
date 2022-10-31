import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import { Post, Tags } from "./types";
import { Status } from "../../types";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (sort: string) => {
    const { data } = await axios.get<Post[]>("/posts", {
      headers: {
        sort,
      },
    });
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get<Post[]>("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: number) => {
    axios.delete(`posts/${id}`);
  }
);

export const extraReducers = (builder) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  builder.addCase(fetchPosts.pending, (state) => {
    state.posts.items = [];
    state.posts.status = Status.LOADING;
  }),
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts.items = action.payload;
        state.posts.status = Status.SUCCESS;
      }
    ),
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = Status.ERROR;
    }),
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = Status.LOADING;
    }),
    builder.addCase(
      fetchTags.fulfilled,
      (state, action: PayloadAction<Tags[]>) => {
        state.tags.items = action.payload;
        state.tags.status = Status.SUCCESS;
      }
    ),
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = Status.ERROR;
    }),
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    });
};
