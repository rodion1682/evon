import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

const bagSlice = createSlice({
	name: 'bag',
	initialState: {
		bag: [],
		isLoading: true,
		error: null,
		sort: 'asc',
	},
	reducers: {
		bagsRequested: (state) => {
			state.isLoading = true;
		},
		bagsRequestFailed: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		bagsReceived: (state, action) => {
			state.isLoading = false;
			state.bag = action.payload;
		},
		sortBags: (state) => {
			state.sort = state.sort === 'asc' ? 'desc' : 'asc';
		},
		bagsRemoved: (state, action) => {
			state.bag = state.bag.filter((bag) => bag._id !== action.payload);
			state.isLoading = false;
		},
		bagsUpdated: (state, action) => {
			state.bag = state.bag.map((bag) =>
				bag._id === action.payload._id ? action.payload : bag
			);
			state.isLoading = false;
		},
		bagsAdded: (state, action) => {
			state.bag.push(action.payload);
			state.isLoading = false;
		},
	},
});

const {
	bagsReceived,
	bagsRequested,
	bagsRequestFailed,
	sortBags,
	bagsRemoved,
	bagsUpdated,
	bagsAdded,
} = bagSlice.actions;

export const loadProducts = () => async (dispatch) => {
	dispatch(bagsRequested());
	try {
		const { data } = await axios.get('http://188.166.167.68/api/bags');
		dispatch(bagsReceived(data));
	} catch (error) {
		dispatch(bagsRequestFailed(error.message));
	}
};

export const getBags = () => (state) => {
	return _.orderBy(state.bags.bag, ['price'], [state.bags.sort]);
};

export const handleSort = () => (dispatch) => {
	dispatch(sortBags());
};

export const getFilterBags = (filter) => async (dispatch) => {
	dispatch(bagsRequested());
	try {
		const { data } = await axios.post(
			'http://188.166.167.68/api/bags',
			filter
		);
		dispatch(bagsReceived(data));
	} catch (error) {}
};

export const getLoading = () => (state) => state.bags.isLoading;

export const getBagById = (id) => (state) => {
	return state.bags.bag.find((bag) => bag._id === id);
};

export const removeBag = (id) => async (dispatch) => {
	dispatch(bagsRequested());
	try {
		await axios.delete(`http://188.166.167.68/api/bags/${id}`);
		dispatch(bagsRemoved(id));
	} catch (error) {
		dispatch(bagsRequestFailed(error.message));
	}
};

export const updateBag = (id, bag) => async (dispatch) => {
	dispatch(bagsRequested());
	try {
		const { data } = await axios.put(
			`http://188.166.167.68/api/bags/${id}`,
			bag,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		dispatch(bagsUpdated(data));
	} catch (error) {
		dispatch(bagsRequestFailed(error.message));
	}
};

export const addNewBag = (bag) => async (dispatch) => {
	console.log('addNewBag', bag);
	dispatch(bagsRequested());
	try {
		const { data } = await axios.post(
			`http://188.166.167.68/api/bags/add`,
			bag,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		console.log('data', data);
		dispatch(bagsAdded(data));
	} catch (error) {
		dispatch(bagsRequestFailed(error.message));
	}
};

export default bagSlice.reducer;
