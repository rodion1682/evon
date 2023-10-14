import React from 'react';
import '../styles/admin.scss';
import { useSelector } from 'react-redux';
import { getBags, getLoading } from '../store/bagSlice';
import AdminItem from '../components/Admin/AdminItem';

const Admin = () => {
	const items = useSelector(getBags());
	const isLoading = useSelector(getLoading());
	if (!isLoading) {
		return (
			<div className="admin">
				<div className="admin__container _container">
					<div className="admin__line">
						<AdminItem />
						{items.map((item) => {
							return (
								<AdminItem
									key={item._id}
									{...item}
									isLoading={isLoading}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
};

export default Admin;
