import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { isLoogedIn, logoutUser } from '../../store/userSlice';

const HeaderFooter = ({ isActive }) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(isLoogedIn());

	const handleLeave = () => {
		dispatch(logoutUser());
	};

	return (
		<div className="header__footer header-footer">
			<div className={`header-footer__menu ${isActive ? 'active' : ''}`}>
				<nav className="header-footer__navigation">
					<ul className="header-footer__list">
						{isAuth && (
							<li className="header-footer__item">
								<Link className="header-footer__link" to={ADMIN_ROUTE}>
									Admin Page
								</Link>
							</li>
						)}
					</ul>
				</nav>
				<div className="header-footer__registration">
					{!isAuth ? (
						<Link
							className="header-footer__link header-footer__link_registration"
							to={LOGIN_ROUTE}
						>
							Sign up / Log in
						</Link>
					) : (
						<button
							onClick={handleLeave}
							className="header-footer__link header-footer__link_registration"
						>
							Leave
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

HeaderFooter.propTypes = {
	isActive: PropTypes.bool.isRequired,
};

export default HeaderFooter;
