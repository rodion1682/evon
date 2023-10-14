import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bagsReducer from './bagSlice';
import cartSlice from './cartSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
	cart: cartSlice,
	bags: bagsReducer,
	user: userSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});
