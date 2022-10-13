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

// import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from '../../../utils/axios';
// import { Post, Tags, Status } from './types';



// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (sort: string) => {
//    const { data } = await axios.get<Post[]>('/posts', {
//       headers: {
//          sort
//       }
//    })
//    return data
// })

// export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
//    const { data } = await axios.get<Post[]>('/tags')
//    return data
// })

// export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
//    axios.delete(`posts/${id}`)
// })


// export const extraReducers = (builder) => {
//    builder.addCase(fetchPosts.pending, (state) => {
//       state.posts.items = []
//       state.posts.status = 'loading'
//    }),
//       builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
//          state.posts.items = action.payload
//          state.posts.status = 'loaded'
//       }),
//       builder.addCase(fetchPosts.rejected, (state) => {
//          state.posts.items = []
//          state.posts.status = 'error'
//       }),
//       builder.addCase(fetchTags.pending, (state) => {
//          state.tags.items = []
//          state.tags.status = 'loading'
//       }),
//       builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tags[]>) => {
//          state.tags.items = action.payload
//          state.tags.status = 'loaded'
//       }),
//       builder.addCase(fetchTags.rejected, (state) => {
//          state.tags.items = []
//          state.tags.status = 'error'
//       }),
//       builder.addCase(fetchRemovePost.pending, (state, action) => {
//          state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
//       })

// }





