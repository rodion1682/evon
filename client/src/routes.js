import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Home from './pages/Home';
import BagPage from './pages/BagPage';
import Login from './pages/Login';

import {
	ADMIN_ROUTE,
	CART_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
	BAG_ROUTE,
} from './utils/consts';

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
];

export const pubilcRoutes = [
	{
		path: HOME_ROUTE,
		Component: Home,
	},
	{
		path: BAG_ROUTE + '/:id',
		Component: BagPage,
	},
	{
		path: CART_ROUTE,
		Component: Cart,
	},
	{
		path: LOGIN_ROUTE,
		Component: Login,
	},
];
