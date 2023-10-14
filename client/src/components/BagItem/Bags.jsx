import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BAG_ROUTE } from '../../utils/consts';
import { addBagToCart } from '../../store/cartSlice';
import { getImage } from '../../utils/getImage';
import PropTypes from 'prop-types';

const BagItem = ({ bag }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handlePageChange = () => {
		history.push(BAG_ROUTE + '/' + bag._id);
	};

	const handleCarAdd = () => {
		dispatch(addBagToCart(bag));
	};

	return (
		<div
			key={bag._id}
			capacity={bag.capacity}
			weight={bag.weight}
			brand={bag.brand}
			className="bag"
		>
			<div className="bag__inner">
				<button
					className="bag__image-ibg_contain"
					onClick={handlePageChange}
					type="button"
				>
					<img src={getImage(bag.image)} alt="image" />
				</button>
				<div className="bag__box">
					<button
						className="bag__title"
						onClick={handlePageChange}
						type="button"
					>
						{bag.name}
					</button>
					<div className="bag__price">{bag.price}</div>
				</div>
			</div>
			<button
				className="bag__button"
				data-id={bag.id}
				onClick={handleCarAdd}
			>
				Add to Cart
			</button>
		</div>
	);
};

BagItem.propTypes = {
	bag: PropTypes.object.isRequired,
};

export default BagItem;
