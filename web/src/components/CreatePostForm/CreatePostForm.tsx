import axios from 'axios';
import React, { useState } from 'react';
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
	const [fileName, setFileName] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

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

	const submitPost = () => {
		//request for validation
		axios
			.post('http://localhost:8000/api/posts/submit', {
				facultyName,
				facultyArea,
				postTitle,
				fileName,
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
			<form
				//request for file upload
				action='http://localhost:8000/api/posts/submit'
				method='POST'
				encType='multipart/form-data'
			>
				<h3>Grad</h3>
				<select
					onChange={e => {
						updateFacultyList(e.target.value);
						setFacultyArea(e.target.value);
					}}
				>
					{/* <option selected disabled hidden></option> */}
					<option hidden></option>
					{facultyAreas}
				</select>

				<h3>Fakultet</h3>
				<select
					onChange={e => {
						setFacultyName(e.target.value);
					}}
				>
					{/* TODO: make user's faculty the first option */}
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
					name='material'
					onChange={e => {
						setFileName(e.target.value);
					}}
				/>
				<input type='submit' value='Objavi' onClick={submitPost} />
			</form>
			<p className={errorMsg.length > 0 ? 'error-msg' : 'hide'}>{errorMsg}</p>
		</div>
	);
};
