import { Routes, Navigate, Route } from 'react-router-dom'
import * as ROUTES from '../utils/consts'
import { privateRoutes, publicRoutes } from './routes'



export const AppRouter = () => {
   const auth = false
   return auth ? (
      <Routes>
         {privateRoutes.map(({ path, Component }) =>
            <Route key={path} path={path} element={<Component />} />
         )}
         <Route key={ROUTES.HOME_ROUTE} path='*' element={<Navigate to={ROUTES.HOME_ROUTE} />} />
      </Routes>
   ) : (
      <Routes>
         {publicRoutes.map(({ path, Component }) =>
            <Route key={path} path={path} element={<Component />} />
         )}
         <Route key={ROUTES.HOME_ROUTE} path='*' element={<Navigate to={ROUTES.HOME_ROUTE} />} />
      </Routes>
   )

} 