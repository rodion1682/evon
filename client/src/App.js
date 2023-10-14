import React, { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { loadProducts } from './store/bagSlice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadProducts());
	}, []);
	return (
		<>
			<Header />
			<AppRouter />
		</>
	);
}

export default App;
