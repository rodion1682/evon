import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, pubilcRoutes } from '../routes';
import { HOME_ROUTE } from '../utils/consts';
import { isLoogedIn } from '../store/userSlice';
import { useSelector } from 'react-redux';

const AppRouter = () => {
	const isAuth = useSelector(isLoogedIn());
	return (
		<>
			<Switch>
				{isAuth &&
					authRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} component={Component} exact />
					))}
				{pubilcRoutes.map(({ path, Component }) => {
					return (
						<Route key={path} path={path} component={Component} exact />
					);
				})}
				<Redirect to={HOME_ROUTE} />
			</Switch>
		</>
	);
};

export default AppRouter;
