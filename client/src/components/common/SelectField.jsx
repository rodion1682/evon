import PropTypes from 'prop-types';

const SelectField = ({
	label,
	value,
	onChange,
	defaultoption,
	options,
	error,
	name,
	order,
}) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	const getInputClasses = () => {
		return 'admin__select select' + (error ? ' is-invalid' : '');
	};

	const optionsArray =
		!Array.isArray(options) && typeof options === 'object'
			? Object.values(options)
			: options;
	return (
		<div className={`admin__item admin__item_${order}`} key={name}>
			<label htmlFor={name} className="admin__title">
				{label}
			</label>
			<div className="admin__content">
				<div className="admin__select-wrapper select-wrapper">
					<select
						className={getInputClasses()}
						id={name}
						name={name}
						value={value}
						onChange={handleChange}
					>
						<option disabled defaultValue={defaultoption} value="">
							{defaultoption}
						</option>
						{optionsArray.length > 0 &&
							optionsArray.map((option) => (
								<option value={option} key={option}>
									{option}
								</option>
							))}
					</select>
					{error && <div className="invalid-feedback">{error}</div>}
				</div>
			</div>
		</div>
	);
};

SelectField.propTypes = {
	defaultOption: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	name: PropTypes.string,
};

export default SelectField;
