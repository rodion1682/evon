import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({
	label,
	type,
	name,
	value,
	onChange,
	error,
	order,
	placeholder,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	const getInputClasses = () => {
		return 'admin__input admin__input_name' + (error ? ' is-invalid' : '');
	};
	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<div
			className={order ? `admin__item admin__item_${order}` : 'admin__item'}
			key={label}
		>
			<label className="admin__title" htmlFor={name}>
				{label}
			</label>
			<div
				className={
					type === 'password'
						? `admin__content admin__content_${type}`
						: 'admin__content'
				}
			>
				<input
					placeholder={placeholder}
					type={showPassword ? 'text' : type}
					id={name}
					name={name}
					value={value === undefined ? '' : value}
					onChange={handleChange}
					className={getInputClasses()}
				/>
				{type === 'password' && (
					<button
						className="button"
						type="button"
						onClick={toggleShowPassword}
					>
						{showPassword ? 'Hide' : 'Show'}
					</button>
				)}
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};
TextField.defaultProps = {
	type: 'text',
};
TextField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
};

export default TextField;
