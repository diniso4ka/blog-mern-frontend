import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './extraReducers';





const initialState = {
   posts: {
      items: [],
      status: 'loading',
   },
   tags: {
      items: [],
      status: 'loading'
   }
}

const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {

   },
   extraReducers: extraReducers()
})

export const postsReducer = postsSlice.reducer