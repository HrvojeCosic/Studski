import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { Faculty } from '../FacultyList/FacultyList';
import './CreatePostForm.scss';

export const CreatePostForm: React.FC<{ faculties: Array<Faculty> }> = ({
	faculties,
}) => {
	const [formFacultyList, setFormFacultyList] = useState([
		<option key='defaultKey'></option>,
	]);
	const [title, setTitle] = useState('');

	const facultyAreasSet = new Set(
		faculties.map(faculty => {
			return faculty.grad;
		})
	);
	const facultyAreas = Array.from(facultyAreasSet).map(area => {
		return <option key={area}>{area}</option>;
	});

	const updateFacultyList = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedArea = event.target.value;
		const list: Array<JSX.Element> = faculties.map(faculty => {
			if (faculty.grad === selectedArea) {
				return (
					<option selected key={selectedArea + faculty.id}>
						{faculty.ime}
					</option>
				);
			}
			//return option element just to make typescript happy
			else
				return (
					<option
						key={selectedArea + faculty.id}
						style={{ display: 'none' }}
					></option>
				);
		});
		setFormFacultyList(list);
	};

	const submitPost = () => {
		axios
			.post('http://localhost:8000/api/posts/submit', { title })
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='post-form-container'>
			<h3>Grad</h3>
			<select onChange={updateFacultyList}>
				<option selected disabled hidden></option>
				{facultyAreas}
			</select>

			<h3>Fakultet</h3>
			<select>
				{/* TODO: make user's faculty the first option */}
				{formFacultyList}
			</select>
			<input
				type='text'
				placeholder='Naslov'
				onChange={e => setTitle(e.target.value)}
			/>
			<input type='file' name='datoteka' />
			<input type='submit' value='Objavi' onClick={submitPost} />
		</div>
	);
};
