import PropTypes from 'prop-types';

const AsideCheckbox = ({
	categoryValues,
	title,
	unit,
	name,
	onChange,
	valueData,
}) => {
	return (
		<div className="aside__item">
			<div className="aside__title">
				{`By ${title.charAt(0).toUpperCase() + title.slice(1)}`}
			</div>
			<div className="aside__checkbox-wrapper">
				{categoryValues.map((value) => (
					<label
						key={value}
						className={`aside__checkbox ${
							valueData[title] !== undefined &&
							valueData[title].includes(value)
								? 'active'
								: ''
						}`}
					>
						<input
							type="checkbox"
							value={value}
							checked={
								valueData[title] !== undefined &&
								valueData[title].includes(value)
							}
							onChange={() => onChange(value, title)}
							name={name}
						/>
						<span>
							{value} {unit}
						</span>
					</label>
				))}
			</div>
		</div>
	);
};

AsideCheckbox.propTypes = {
	categoryValues: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	unit: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	valueData: PropTypes.object.isRequired,
};

export default AsideCheckbox;
