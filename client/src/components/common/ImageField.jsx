import React from 'react';
import { getImage } from '../../utils/getImage';
import notFound from '../../assets/404.png';
import PropTypes from 'prop-types';

const ImageField = ({ itemId, name, onChange, src, order, preview }) => {
	return (
		<div className={`admin__item admin__item_${order}`} key={itemId}>
			<div className="admin__title">{name}</div>
			<div className="admin__content admin__content_image">
				<input
					id={`file-${itemId}`}
					autoComplete="off"
					type="file"
					accept="image/*"
					onChange={onChange}
					className="admin__image-input"
				/>
				<label htmlFor={`file-${itemId}`} className="admin__image-ibg">
					<img
						src={preview ? preview : src ? getImage(src) : notFound}
						alt="image"
					/>
				</label>
			</div>
		</div>
	);
};

ImageField.propTypes = {
	itemId: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	src: PropTypes.string,
	order: PropTypes.number.isRequired,
	preview: PropTypes.string,
};

export default ImageField;
