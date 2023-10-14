import React, { useState } from 'react';
import '../styles/login.scss';
import TextField from '../components/common/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { authError, signIn, signUp } from '../store/userSlice';
import { useHistory } from 'react-router-dom';
import { errorCatcher } from '../utils/error-catcher';

const Login = () => {
	const history = useHistory();
	const erorr = errorCatcher(useSelector(authError()));
	const dispatch = useDispatch();
	const [data, setData] = useState({});
	let type = 'login';

	const handleChange = (target) => {
		setData({ ...data, [target.name]: target.value });
	};

	const [formType, setFormType] = useState(type === 'signup' ? type : 'login');

	const toggleFormType = () => {
		setFormType((prevState) => (prevState === 'signup' ? 'login' : 'signup'));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formType === 'signup') {
			dispatch(signUp(data, history));
		} else {
			dispatch(signIn(data, history));
		}
	};
	return (
		<div className="login">
			<div className="login__container _container">
				<form className="login__form">
					{formType === 'signup' ? (
						<>
							<h3 className="login__title">Sign up</h3>
							<div className="login__body">
								<TextField
									value={data.email || ''}
									name={'email'}
									placeholder={'Email'}
									onChange={handleChange}
								/>
								<TextField
									value={data.password || ''}
									name={'password'}
									placeholder={'Password'}
									onChange={handleChange}
									type={'password'}
								/>
							</div>
							<div className="login__bottom">
								<p className="login__text">Already have account?</p>
								<button
									type="button"
									className="login__switch"
									role="button"
									onClick={toggleFormType}
								>
									Sign In
								</button>
							</div>
						</>
					) : (
						<>
							<h3 className="login__title">Log in</h3>
							<div className="login__body">
								<TextField
									value={data.email}
									name={'email'}
									placeholder={'Email'}
									onChange={handleChange}
								/>
								<TextField
									value={data.password}
									name={'password'}
									placeholder={'Password'}
									onChange={handleChange}
									type={'password'}
								/>
							</div>
							<div className="login__bottom">
								<p className="login__text"> Dont have account?</p>
								<button
									className="login__switch"
									role="button"
									type="button"
									onClick={toggleFormType}
								>
									Sign Up
								</button>
							</div>
						</>
					)}
					<button
						type="submit"
						className="login__button"
						onClick={handleSubmit}
					>
						Submit
					</button>
					{erorr && <div className="login__error">{erorr}</div>}
				</form>
			</div>
		</div>
	);
};

export default Login;
