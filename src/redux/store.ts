import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice/authSlice";
import { postsReducer } from "./slices/postsSlice/postsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
