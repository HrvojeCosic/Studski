import React from 'react';
import { Faculty } from '../FacultyList/FacultyList';
import './CreatePostForm.scss';

export const CreatePostForm: React.FC<{ faculties: Array<Faculty> }> = ({
	faculties,
}) => {
	return (
		<div className='post-form-container'>
			<h3>Fakultet</h3>
			<select>
				{/* TODO: make user's faculty the first option */}
				<option>fakultet 1...</option>
			</select>
			<input type='text' placeholder='Naslov' />
			<input type='file' name='datoteka' />
		</div>
	);
};
