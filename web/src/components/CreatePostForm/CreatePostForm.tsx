import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormData from 'form-data';
import Cookies from 'js-cookie';
import { Faculty } from '../FacultyList/FacultyList';
import './CreatePostForm.scss';
import { updateUserPosts } from '../../actions/user';

export const CreatePostForm: React.FC<{ faculties: Array<Faculty> }> = ({
	faculties,
}) => {
	const [formFacultyList, setFormFacultyList] = useState([
		<option key='defaultKey'></option>,
	]);

	const dispatch = useDispatch();

	const [postAuthor, setPostAuthor] = useState('');
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

		if (!postTitle || !facultyArea || !facultyName || !file) {
			setErrorMsg('Sva polja moraju biti ispunjena.');
			return;
		}

		formData.append('postAuthor', postAuthor);
		formData.append('facultyName', facultyName);
		formData.append('facultyArea', facultyArea);
		formData.append('postTitle', postTitle);
		formData.append('fileName', file.name);
		formData.append('file', file);

		//AUTHORIZE
		const sid = Cookies.get('connect.sid');
		axios
			.post('http://localhost:8000/api/users/checkAuth', sid, {
				withCredentials: true,
			})
			.then(res => {
				setPostAuthor(res.data.message);
			})
			.catch(err => {
				setErrorMsg(err.response.data.error);
				return;
			});

		//REQUEST
		axios
			.post('http://localhost:8000/api/posts/submit', formData)
			.then(res => {
				dispatch(updateUserPosts('add post', res.data.newPost));
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
