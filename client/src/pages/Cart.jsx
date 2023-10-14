import React from 'react';
import '../styles/cart.scss';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCart,
	increaseBagQuantity,
	decreaseBagQuantity,
	removeBagFromCart,
} from '../store/cartSlice';
import { getImage } from '../utils/getImage';

const Cart = () => {
	const items = useSelector(selectCart());
	const sum = items.reduce((acc, item) => {
		return acc + item.price * item.quantity;
	}, 0);
	const dispatch = useDispatch();

	const increaseQuantity = ({ _id }) => {
		dispatch(increaseBagQuantity(_id));
	};

	const decreaseQuantity = ({ _id }) => {
		dispatch(decreaseBagQuantity(_id));
	};

	const handleDelete = ({ _id }) => {
		dispatch(removeBagFromCart(_id));
	};

	return (
		<div className="cart">
			<div className="cart__container _container">
				<div className="cart__body">
					{items.map((item) => {
						return (
							<div className="cart__item" key={item._id}>
								<div className="cart__content">
									<div className="cart__inner">
										<div className="cart__image-ibg_contain">
											<img src={getImage(item.image)} alt="image" />
										</div>
										<div className="cart__title">{item.name}</div>
									</div>
								</div>
								<div className="cart__numbers">
									<div className="cart__price">{item.price}</div>
									<div className="cart__quantity">
										<button
											className="cart__btn cart__btn_minus"
											onClick={() => decreaseQuantity(item)}
										></button>
										<div className="cart__input">
											<input
												id={item.id}
												value={item.quantity}
												disabled
											/>
										</div>
										<button
											className="cart__btn cart__btn_plus"
											onClick={() => increaseQuantity(item)}
										></button>
									</div>
									<div className="cart__subtotal">
										{(item.price * item.quantity).toFixed(2)}
									</div>
								</div>
								<button
									className="cart__delete"
									onClick={() => handleDelete(item)}
								>
									<FaTrash />
								</button>
							</div>
						);
					})}
				</div>
				<div className="cart__bottom">
					<div className="cart__total">
						<div className="cart__total-text">total:</div>
						<div className="cart__total-price">{sum.toFixed(2)}</div>
					</div>
					<button type="button" className="cart__button">
						Buy
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
