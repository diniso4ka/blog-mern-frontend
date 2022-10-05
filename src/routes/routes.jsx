import { Login } from '../pages/Login/index';
import { AddPost } from '../pages/AddPost/index';
import { Registration } from '../pages/Registration/index';
import { Home } from '../pages/Home';
import { FullPost } from '../pages/FullPost';

import * as ROUTES from '../utils/consts'

export const privateRoutes = [
   {
      path: ROUTES.ADDPOST_ROUTE,
      Component: AddPost
   },
   {
      path: ROUTES.HOME_ROUTE,
      Component: <Home />
   },
   {
      path: ROUTES.FULLPOST_ROUTE,
      Component: FullPost
   },
   {
      path: ROUTES.LOGIN_ROUTE,
      Component: Login
   },
   {
      path: ROUTES.REGISTER_ROUTE,
      Component: Registration
   }
]

export const publicRoutes = [
   {
      path: ROUTES.HOME_ROUTE,
      Component: Home
   },
   {
      path: ROUTES.FULLPOST_ROUTE,
      Component: FullPost
   },
   {
      path: ROUTES.LOGIN_ROUTE,
      Component: Login
   },
   {
      path: ROUTES.REGISTER_ROUTE,
      Component: Registration
   }
]