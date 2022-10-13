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
   },
   comments: {
      comms: [],
      status: 'loading'
   }

}

const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      addComment: (state, action) => {
         state.comments.comms = action.payload
         console.log(state.comments.comms)
      }
   },
   extraReducers: extraReducers
})

export const postsReducer = postsSlice.reducer
export const { addComment } = postsSlice.actions

// import { createSlice } from '@reduxjs/toolkit';
// import { extraReducers } from './extraReducers';

// import { InitialState, Status } from './types';


// const initialState: InitialState = {
//    posts: {
//       items: [],
//       status: Status.LOADING,
//    },
//    tags: {
//       items: [],
//       status: Status.LOADING
//    },
//    comments: {
//       comms: [],
//       status: Status.LOADING
//    }

// }

// const postsSlice = createSlice({
//    name: 'posts',
//    initialState,
//    reducers: {
//       addComment: (state, action) => {
//          state.comments.comms = action.payload
//       }
//    },
//    extraReducers: extraReducers
// })

// export const postsReducer = postsSlice.reducer
// export const { addComment } = postsSlice.actions


