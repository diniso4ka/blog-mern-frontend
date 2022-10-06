import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (sort) => {
   const { data } = await axios.get('/posts', {
      headers: {
         sort
      }
   })
   return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
   const { data } = await axios.get('/tags')
   return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
   axios.delete(`posts/${id}`)
})


export const extraReducers = {
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
   [fetchTags.pending]: (state) => {
      state.tags.items = []
      state.tags.status = 'loading'
   },
   [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = 'loaded'
   },
   [fetchTags.rejected]: (state) => {
      state.tags.items = []
      state.tags.status = 'error'
   },
   [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
   },
}



