import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   const { data } = await axios.get('/posts')
   return data
})

export const extraReducers = () => {
   const fetchPostsReducer = {
      [fetchPosts.pending]: (state) => {
         state.posts.items = []
         state.posts.status = 'loading'
      },
      [fetchPosts.fulfilled]: (state, action) => {
         state.posts.items = action.payload
         state.posts.status = 'loaded'
      },
      [fetchPosts.rejected]: (state) => {
         state.posts.items = []
         state.posts.status = 'error'
      },
   }
   return fetchPostsReducer
}