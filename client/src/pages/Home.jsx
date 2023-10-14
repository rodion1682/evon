import React, { useState } from 'react';
import '../styles/home.scss';
import Search from '../components/Search/Search';
import Aside from '../components/Aside/Aside';
import BagItem from '../components/BagItem/Bags';
import { useSelector, useDispatch } from 'react-redux';
import { getBags } from '../store/bagSlice';
import { getFilterBags } from '../store/bagSlice';
import Loader from '../components/Loader/Loader';

const initialState = {
	brand: [],
	weight: [],
	capacity: [],
	priceMin: '',
	priceMax: '',
	name: '',
};

const Home = () => {
	const isLoading = useSelector((state) => state.bags.isLoading);
	const items = useSelector(getBags());
	const dispatch = useDispatch();

	const [filterData, setFilterData] = useState(initialState);

	const handleReset = () => {
		setFilterData(initialState);
		dispatch(getFilterBags(initialState));
	};

	return (
		<div className="wrapper">
			<div className="home">
				<div className="home__container _container">
					<div className="home__aside">
						<Aside
							filterData={filterData}
							setFilterData={setFilterData}
							handleReset={handleReset}
						/>
					</div>
					<div className="home__content">
						<Search
							filterData={filterData}
							setFilterData={setFilterData}
						/>
						<div className="home__items">
							{isLoading ? (
								<div className="home__loader">
									<Loader />
								</div>
							) : (
								items.map((bag) => <BagItem key={bag._id} bag={bag} />)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
