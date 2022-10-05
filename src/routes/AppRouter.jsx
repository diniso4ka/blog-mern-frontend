import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom'
import * as ROUTES from '../utils/consts'
import { privateRoutes, publicRoutes } from './routes'

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice/authSlice';
import { fetchAuth } from '../redux/slices/authSlice/extraReducers';



export const AppRouter = () => {
   const dispatch = useDispatch()
   const isAuth = useSelector(selectIsAuth)
   const token = window.localStorage.getItem('token')

   if (token) {
      return (
         <Routes>
            {privateRoutes.map(({ path, Component }) =>
               <Route key={path} path={path} element={<Component />} />
            )}
            <Route key={ROUTES.HOME_ROUTE} path='*' element={<Navigate to={ROUTES.HOME_ROUTE} />} />
         </Routes>
      )
   } else {
      return (
         <Routes>
            {publicRoutes.map(({ path, Component }) =>
               <Route key={path} path={path} element={<Component />} />
            )}
            <Route key={ROUTES.HOME_ROUTE} path='*' element={<Navigate to={ROUTES.HOME_ROUTE} />} />
         </Routes>
      )
   }

} 