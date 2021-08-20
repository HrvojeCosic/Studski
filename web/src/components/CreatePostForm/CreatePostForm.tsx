import axios from 'axios';
import React, { useState } from 'react';
import FormData from 'form-data';
import { Faculty } from '../FacultyList/FacultyList';
import './CreatePostForm.scss';

export const CreatePostForm: React.FC<{ faculties: Array<Faculty> }> = ({
	faculties,
}) => {
	const [formFacultyList, setFormFacultyList] = useState([
		<option key='defaultKey'></option>,
	]);

	const [postTitle, setPostTitle] = useState('');
	const [facultyArea, setFacultyArea] = useState('');
	const [facultyName, setFacultyName] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [file, setFile] = useState<any>(null);

	const facultyAreasSet = new Set(
		faculties.map(faculty => {
			return faculty.grad;
		})
	);
	const facultyAreas = Array.from(facultyAreasSet).map(area => {
		return <option key={area}>{area}</option>;
	});

	const updateFacultyList = (selectedArea: string) => {
		const list: Array<JSX.Element> = faculties.map(faculty => {
			if (faculty.grad === selectedArea) {
				return <option key={selectedArea + faculty.id}>{faculty.ime}</option>;
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

	const handleFile = (e: any) => {
		setFile(e.target.files[0]);
	};

	const submitPost = (e: any) => {
		const formData = new FormData();

		if (file) {
			formData.append('name', file.name);
			formData.append('file', file);
		}
		axios.post('http://localhost:8000/api/posts/submit', formData);
		axios
			.post('http://localhost:8000/api/posts/submit', {
				facultyName,
				facultyArea,
				postTitle,
			})
			.then(res => {
				setErrorMsg(res.data.message);
			})
			.catch(err => {
				setErrorMsg(err.response.data.error);
			});
	};

	return (
		<div className='post-form-container'>
			<h3>Grad</h3>
			<select
				onChange={e => {
					updateFacultyList(e.target.value);
					setFacultyArea(e.target.value);
				}}
			>
				<option hidden></option>
				{facultyAreas}
			</select>
			<h3>Fakultet</h3>
			<select
				onChange={e => {
					setFacultyName(e.target.value);
				}}
			>
				{/* TODO:(?) make user's faculty the first option */}
				<option hidden></option>
				{formFacultyList}
			</select>
			<input
				type='text'
				placeholder='Naslov'
				onChange={e => setPostTitle(e.target.value)}
			/>
			<input
				type='file'
				onChange={e => {
					handleFile(e);
				}}
			/>
			<button onClick={e => submitPost(e)}>Objavi</button>
			<p className={errorMsg.length > 0 ? 'error-msg' : 'hide'}>{errorMsg}</p>
		</div>
	);
};
