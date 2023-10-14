import { createSlice } from '@reduxjs/toolkit';
import {
	getCartFromLocalStorage,
	saveCartToLocalStorage,
} from '../utils/localStorage';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		bag: getCartFromLocalStorage(),
		error: null,
	},
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const existingItem = state.bag.find((i) => i._id === item._id);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.bag.push({ ...item, quantity: 1 });
			}
			saveCartToLocalStorage(state.bag);
		},
		removeFromCart: (state, action) => {
			const id = action.payload;
			state.bag = state.bag.filter((item) => item._id !== id);
			saveCartToLocalStorage(state.bag);
		},
		increaseQuantity: (state, action) => {
			const id = action.payload;
			const existingItem = state.bag.find((i) => i._id === id);
			existingItem.quantity++;
			saveCartToLocalStorage(state.bag);
		},
		decreaseQuantity: (state, action) => {
			const id = action.payload;
			const existingItem = state.bag.find((i) => i._id === id);
			if (existingItem.quantity === 1) {
				state.bag = state.bag.filter((i) => i._id !== id);
			} else {
				existingItem.quantity--;
			}
			saveCartToLocalStorage(state.bag);
		},
	},
});

const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity } =
	cartSlice.actions;

export const addBagToCart = (item) => (dispatch) => {
	dispatch(addToCart(item));
};

export const removeBagFromCart = (id) => (dispatch) => {
	dispatch(removeFromCart(id));
};

export const increaseBagQuantity = (id) => (dispatch) => {
	dispatch(increaseQuantity(id));
};

export const decreaseBagQuantity = (id) => (dispatch) => {
	dispatch(decreaseQuantity(id));
};

export const selectCart = () => (state) => {
	return state.cart.bag;
};

export default cartSlice.reducer;
