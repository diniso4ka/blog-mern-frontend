import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom'
import * as ROUTES from '../utils/consts'
import { privateRoutes, publicRoutes } from './routes'

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice/authSlice';


export const AppRouter = () => {
   const isAuth = useSelector(selectIsAuth)
   const token = window.localStorage.getItem('token')

   if (token || isAuth) {
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