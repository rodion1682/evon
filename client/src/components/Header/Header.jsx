import React, { useState } from 'react';
import '../../styles/style.scss';
import HeaderBody from './HeaderBody';
import HeaderFooter from './HeaderFooter';
import '../../styles/header.scss';

const Header = () => {
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(!isActive);
		document.body.style.overflow = isActive ? '' : 'hidden';
	};

	return (
		<header className="header">
			<div className="header__container _container">
				<HeaderBody isActive={isActive} handleClick={handleClick} />
				<HeaderFooter isActive={isActive} />
			</div>
		</header>
	);
};

export default Header;
