import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/bag-page.scss';
import { HOME_ROUTE } from '../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { getBagById } from '../store/bagSlice';
import { addBagToCart } from '../store/cartSlice';
import { getImage } from '../utils/getImage';

const BagPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const item = useSelector(getBagById(id));

	const handleCarAdd = () => {
		dispatch(addBagToCart(item));
	};

	return (
		<>
			{item && (
				<div className="bag-page">
					<div className="bag-page__container _container">
						<div className="bag-page__image-ibg_contain">
							<img src={getImage(item.image)} alt="image" />
						</div>
						<div className="bag-page__items">
							<div className="bag-page__top">
								<div className="bag-page__box">
									<div className="bag-page__navigation">
										<Link to={HOME_ROUTE} className="bag-page__link">
											Home
										</Link>
										<div className="bag-page__span">{item.name}</div>
									</div>
									<div className="bag-page__title">{item.name}</div>
								</div>
								<div className="bag-page__wrapper">
									<div className="bag-page__price">{item.price}</div>
									<button
										className="bag-page__button"
										data-id={item.id}
										onClick={handleCarAdd}
									>
										Add to Cart
									</button>
								</div>
							</div>
							<div className="bag-page__bottom">
								<div className="bag-page__item">
									<div className="bag-page__name">Item brand:</div>
									<div className="bag-page__value">{item.brand}</div>
								</div>
								<div className="bag-page__item">
									<div className="bag-page__name">Item weight:</div>
									<div className="bag-page__value">
										{item.weight} kg
									</div>
								</div>
								<div className="bag-page__item">
									<div className="bag-page__name">Item capacity:</div>
									<div className="bag-page__value">
										{item.capacity} L
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BagPage;
