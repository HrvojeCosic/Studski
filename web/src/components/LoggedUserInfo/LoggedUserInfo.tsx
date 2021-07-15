import React from 'react';
import './LoggedUserInfo.scss';

export const LoggedUserInfo: React.FC = () => {
	return (
		<div className='logged-user-info-container'>
			<div className='logged-user-main'>
				<h3>Ime profila</h3>
				<div className='user-numbers'>
					<p>Kolegijalnost: x</p>
					<p>Broj objava: y</p>
				</div>
			</div>
			<div className='logged-user-list'>
				<p>Objava broj xyxyxyxyxyxyxyxy</p>
				<p>Objava broj xyxyxyxyxyxyxyxy</p>
				<p>Objava broj xyxyxyxyxyxyxyxy</p>
				<p>Objava broj xyxyxyxyxyxyxyxy</p>
				<p>Objava broj xyxyxyxyxyxyxyxy</p>
			</div>
		</div>
	);
};
