import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectField from '../common/SelectField';
import filter from '../../api/filter.api';
import TextField from '../common/TextField';
import ImageField from '../common/ImageField';
import { removeBag, updateBag, addNewBag } from '../../store/bagSlice';
import PropTypes from 'prop-types';

const formData = new FormData();

const initialState = {
	name: '',
	price: '',
	image: '',
	capacity: '',
	weight: '',
	brand: '',
	preview: '',
};

const AdminItem = (item) => {
	const dispatch = useDispatch();
	const [data, setData] = useState(item._id ? item : initialState);
	const handleChange = (target) => {
		setData({ ...data, [target.name]: target.value });
	};

	const handleImage = (event) => {
		const file = event.target.files[0];
		formData.append('image', file);
		setData((prevState) => ({
			...prevState,
			preview: URL.createObjectURL(file),
		}));
	};

	const handleSaveChanges = () => {
		formData.append('data', JSON.stringify(data));
		dispatch(updateBag(data._id, formData));
		console.log(formData);
	};

	const handleItemDelete = () => {
		dispatch(removeBag(data._id));
	};

	const handleItemAdd = () => {
		formData.append('data', JSON.stringify(data));
		console.log(data);
		dispatch(addNewBag(formData));
	};

	return (
		<>
			<div className="admin__items">
				<TextField
					label={'name'}
					value={data.name}
					name={'name'}
					onChange={handleChange}
					order={1}
				/>
				<TextField
					label={'price'}
					value={data.price}
					name={'price'}
					onChange={handleChange}
					order={2}
				/>
				<ImageField
					itemId={data._id}
					name={'image'}
					src={data.image}
					onChange={handleImage}
					order={3}
					preview={data.preview}
				/>
				{Object.entries(filter).map(([name, options]) => {
					return (
						<SelectField
							order={4}
							key={name}
							label={name}
							value={data[name]}
							name={name}
							options={options}
							onChange={handleChange}
							defaultoption={'Select value'}
						/>
					);
				})}
				<div className="admin__actions">
					{item._id ? (
						<>
							<button
								className="admin__button admin__button_delete"
								onClick={handleItemDelete}
							>
								Delete
							</button>

							<button
								className="admin__button"
								onClick={handleSaveChanges}
							>
								Save
							</button>
						</>
					) : (
						<button
							className="admin__button admin__button_add"
							onClick={handleItemAdd}
						>
							Add
						</button>
					)}
				</div>
			</div>
		</>
	);
};

AdminItem.propTypes = {
	item: PropTypes.object,
};

export default AdminItem;
