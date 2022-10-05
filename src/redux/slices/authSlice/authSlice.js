import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from '../authSlice/extraReducers'

const initialState = {
   data: null,
   status: 'loading'
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.data = null
      }
   },
   extraReducers: extraReducers
})

export const selectIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions

