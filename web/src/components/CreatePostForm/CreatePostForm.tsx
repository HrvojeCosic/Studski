import React from 'react';

export const CreatePostForm = () => {
	return (
		<div className='form-container'>
			<h3>Fakultet</h3>
			<select>
				<option>fakultet 1...</option>
			</select>
			<input type='text' placeholder='Naslov' />
			<input type='file' name='datoteka' />
		</div>
	);
};
