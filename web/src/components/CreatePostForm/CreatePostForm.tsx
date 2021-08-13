import React, { ChangeEvent } from 'react';
import { Faculty } from '../FacultyList/FacultyList';
import './CreatePostForm.scss';

export const CreatePostForm: React.FC<{ faculties: Array<Faculty> }> = ({
	faculties,
}) => {
	const facultyAreasSet = new Set(
		faculties.map(faculty => {
			return faculty.grad;
		})
	);
	const facultyAreas = Array.from(facultyAreasSet).map(area => {
		return <option key={area}>{area}</option>;
	});

	let facultyNameList: Array<JSX.Element> = [];
	const updateFacultyList = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedArea = event.target.value;
		facultyNameList = faculties.map(faculty => {
			return <option>{faculty.ime}</option>;
		});
	};

	return (
		<div className='post-form-container'>
			<h3>Grad</h3>
			<select onChange={updateFacultyList}>{facultyAreas}</select>
			<h3>Fakultet</h3>
			<select>
				{/* TODO: make user's faculty the first option */}
				<option>{facultyNameList}</option>
			</select>
			<input type='text' placeholder='Naslov' />
			<input type='file' name='datoteka' />
		</div>
	);
};
