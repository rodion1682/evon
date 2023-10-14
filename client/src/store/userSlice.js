import { createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import http from '../utils/fetcher';

const initialState = localStorageService.getAccessToken()
	? {
			isLoading: false,
			error: null,
			auth: localStorageService.getAuthData(),
			isLoggedIn: true,
	  }
	: {
			isLoading: false,
			error: null,
			auth: null,
			isLoggedIn: false,
	  };

const userSlice = createSlice({
	name: 'user',
	initialState,

	reducers: {
		authRequested: (state) => {
			state.isLoading = true;
		},
		authReceved: (state, action) => {
			state.auth = action.payload;
			state.isLoading = false;
			state.isLoggedIn = true;
		},
		authRequestFiled: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		logout: (state) => {
			state.auth = null;
			state.isLoading = false;
			state.isLoggedIn = false;
		},
	},
});

const { authRequested, authReceved, authRequestFiled, logout } =
	userSlice.actions;

export const signUp = (userData, history) => async (dispatch) => {
	dispatch(authRequested());
	try {
		const { data } = await http.post('/auth/signUp', userData);
		dispatch(authReceved(data));
		localStorageService.setTokens(data);
		localStorageService.setAuthData(data);
		history.push('/home');
	} catch (error) {
		console.log(error);
		dispatch(authRequestFiled(error.message));
	}
};

export const signIn = (userData, history) => async (dispatch) => {
	dispatch(authRequested());
	try {
		const { data } = await http.post('/auth/signInWithPassword', userData);
		dispatch(authReceved(data));
		localStorageService.setTokens(data);
		localStorageService.setAuthData(data);
		history.push('/home');
	} catch (error) {
		dispatch(authRequestFiled(error.message));
	}
};

export const isLoogedIn = () => (state) => {
	return state.user.isLoggedIn;
};

export const getAuthData = () => (state) => {
	return state.user.auth;
};

export const authError = () => (state) => {
	return state.user.error;
};

export const logoutUser = () => (dispatch) => {
	localStorageService.removeAuthData();
	dispatch(logout());
};

export default userSlice.reducer;
