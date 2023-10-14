import PropTypes from 'prop-types';

const AsidePrice = ({ onChange, priceMin, priceMax }) => {
	return (
		<div className="aside__item">
			<div className="aside__title">Price filter</div>
			<div className="aside__price">
				Price range: <span>25</span> -<span>300</span>
			</div>
			<form className="aside__form">
				<div className="aside__top">
					<div className="aside__box">
						<input
							type="number"
							id="priceMin"
							name="priceMin"
							className="aside__input"
							placeholder="Price from"
							value={priceMin}
							onChange={onChange}
						/>
					</div>
					<div className="aside__box">
						<input
							type="number"
							id="priceMax"
							name="priceMax"
							className="aside__input"
							placeholder="Price to"
							value={priceMax}
							onChange={onChange}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

AsidePrice.propTypes = {
	onChange: PropTypes.func.isRequired,
	priceMin: PropTypes.string.isRequired,
	priceMax: PropTypes.string.isRequired,
};

export default AsidePrice;
