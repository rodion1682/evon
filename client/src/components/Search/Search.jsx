import React, { useEffect, useState } from 'react';
import '../../styles/style.scss';
import '../../styles/search.scss';
import { useDispatch } from 'react-redux';
import { getFilterBags, handleSort } from '../../store/bagSlice';
import { Debounce } from '../../utils/debounce';

const options = [
	{ value: 'highest', name: 'Highest to Lowest' },
	{ value: 'lowest', name: 'Lowest to Highest' },
];

const Search = ({ filterData, setFilterData }) => {
	const dispatch = useDispatch();
	const [sort, setSort] = useState(options[1].value);

	const handleSearchChange = (event) => {
		setFilterData((prev) => ({
			...prev,
			name: event.target.value,
		}));
	};

	const handleSortChange = (event) => {
		dispatch(handleSort());
		setSort(event.target.value);
	};

	const debouncedInputChange = Debounce(handleSearchChange, 1000);

	useEffect(() => {
		dispatch(getFilterBags(filterData));
	}, [filterData.name]);

	return (
		<div className="search">
			<div className="search__wrapper">
				<div className="search__inner">
					<input
						className="search__input input"
						type="text"
						placeholder="What are you looking for..."
						onChange={debouncedInputChange}
					/>
					<div className="search__select-wrapper select-wrapper">
						<select
							className="search__select select"
							onChange={handleSortChange}
							value={sort}
						>
							{options.map((option) => (
								<option key={option.value} value={option.value}>
									{option.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
