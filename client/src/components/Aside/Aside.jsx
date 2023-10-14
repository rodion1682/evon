import React, { useState } from 'react';
import '../../styles/aside.scss';
import filter from '../../api/filter.api';
import AsidePrice from './AsidePrice';
import AsideCheckbox from './AsideCheckbox';
import { useDispatch } from 'react-redux';
import { getFilterBags } from '../../store/bagSlice';
import PropTypes from 'prop-types';

const Aside = ({ filterData, setFilterData, handleReset }) => {
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState(false);

	const handleFilter = (value, title) => {
		setFilterData((prev) => ({
			...prev,
			[title]: prev[title]
				? prev[title].includes(value)
					? prev[title].filter((item) => item !== value)
					: [...prev[title], value]
				: [value],
		}));
	};

	const handlePrice = (event) => {
		setFilterData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleClick = () => {
		setIsActive(!isActive);
		document.body.style.overflow = isActive ? '' : 'hidden';
	};

	const handeSubmit = () => {
		dispatch(getFilterBags(filterData));
	};

	return (
		<div className={`aside ${isActive ? 'active' : ''}`}>
			<button
				type="button"
				className={`aside__icon icon-burger ${isActive ? 'active' : ''}`}
				onClick={handleClick}
			>
				<span></span>
			</button>
			<div className={`aside__inner ${isActive ? 'active' : ''}`}>
				<div className="aside__content">
					<AsidePrice
						onChange={handlePrice}
						priceMin={filterData.priceMin}
						priceMax={filterData.priceMax}
					/>
					{Object.entries(filter).map(
						([filterKey, filterValues], index) => (
							<AsideCheckbox
								key={index}
								category={filter[filterKey]}
								categoryValues={filterValues}
								title={filterKey}
								onChange={handleFilter}
								valueData={filterData}
								unit={
									filterKey === 'capacity'
										? 'L'
										: filterKey === 'weight'
										? 'kg'
										: ''
								}
								name={filterKey}
							/>
						)
					)}
				</div>
				<button className="aside__button" onClick={handeSubmit}>
					Filter
				</button>
				<button
					className="aside__button aside__button_white"
					onClick={handleReset}
				>
					Reset
				</button>
			</div>
		</div>
	);
};

Aside.propTypes = {
	filterData: PropTypes.object.isRequired,
	setFilterData: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
};

export default Aside;
