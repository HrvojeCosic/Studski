import React from 'react';
import './ProfileList.scss';

export const ProfileList: React.FC = () => {
	return (
		<div className='profile-list-container'>
			<h1>Ljudi</h1>
			{/* TODO: foreach... */}
			<div className='featured-profile'>
				<p className='name'>Ime</p>
				<p className='points'>*100000</p>
				<p className='faculty'>Fakultet</p>
			</div>
		</div>
	);
};
