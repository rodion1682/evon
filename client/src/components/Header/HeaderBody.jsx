import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CART_ROUTE, HOME_ROUTE } from '../../utils/consts';
import logo from '../../assets/logo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cartSlice';

const HeaderBody = ({ isActive, handleClick }) => {
	const count = useSelector(selectCart()).reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);
	return (
		<div className="header__body header-body">
			<Link className="header-body__logo-ibg_contain" to={HOME_ROUTE}>
				<img src={logo} alt="logo" />
			</Link>
			<div className="header-body__box">
				<Link
					className="header-body__basket header-body-basket"
					to={CART_ROUTE}
				>
					<div className="header-body-basket__icon">
						<FaShoppingCart />
						{count > 0 && (
							<div className="header-body-basket__counter">{count}</div>
						)}
					</div>
				</Link>
				<button
					type="button"
					className={`header-body__icon icon-burger ${
						isActive ? 'active' : ''
					}`}
					onClick={handleClick}
				>
					<span></span>
				</button>
			</div>
		</div>
	);
};

HeaderBody.propTypes = {
	isActive: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default HeaderBody;
