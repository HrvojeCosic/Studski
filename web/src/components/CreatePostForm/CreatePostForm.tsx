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
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();

	const [postTitle, setPostTitle] = useState('');
	const [facultyArea, setFacultyArea] = useState('');
	const [facultyName, setFacultyName] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [files, setFiles] = useState<any>(null);
	const [filesTitle, setFilesTitle] = useState<any>('Nema odabranih datoteka');
	let postAuthor = '';

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

	const handleFiles = (e: any) => {
		const chosenFiles = e.target.files;
		setFiles(chosenFiles);
		if (chosenFiles.length === 1) {
			setFilesTitle(chosenFiles[0].name);
		} else if (chosenFiles.length === 0) {
			setFilesTitle('Nema odabranih datoteka');
			setFiles(null);
		} else {
			setFilesTitle(`Broj datoteka: ${chosenFiles.length}`);
		}
	};

	const submitPost = async () => {
		setLoading(true);
		const sid = Cookies.get('connect.sid');
		//AUTHORIZE & SET postAuthor
		await axios
			.post('/users/checkAuth', sid, {
				withCredentials: true,
			})
			.then(res => {
				postAuthor = res.data.message;
			})
			.catch(err => {
				setErrorMsg(err.response.data.error);
				return;
			});

		const formData = new FormData();

		if (!postTitle || !facultyArea || !facultyName || !files) {
			setErrorMsg('Sva polja moraju biti ispunjena.');
			setLoading(false);
			return;
		}

		formData.append('postAuthor', postAuthor);
		formData.append('facultyName', facultyName);
		formData.append('facultyArea', facultyArea);
		formData.append('postTitle', postTitle);
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]); //form data doesn't support FileList object so it has to be done this way
		}

		await axios
			.post('/posts/submit', formData)
			.then(res => {
				dispatch(updateUserPosts('add post', res.data.newPost));
				setErrorMsg(res.data.message);
				setLoading(false);
			})
			.catch(err => {
				setErrorMsg(err.response.data.error);
				setLoading(false);
				return;
			});

		setPostTitle('');
		setFacultyArea('');
		setFacultyName('');
		postAuthor = '';
		setFiles(null);
		setFilesTitle('Nema odabranih datoteka');
	};

	return (
		<div className='post-form-container'>
			<h3>Grad</h3>
			<select
				value={facultyArea}
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
				value={facultyName}
				onChange={e => {
					setFacultyName(e.target.value);
				}}
			>
				<option hidden></option>
				{formFacultyList}
			</select>
			<input
				type='text'
				placeholder='Naslov'
				value={postTitle}
				onChange={e => setPostTitle(e.target.value)}
			/>
			<input
				multiple
				type='file'
				onChange={e => {
					handleFiles(e);
				}}
				id='actual-input'
			/>
			<label htmlFor='actual-input' className='file-label'>
				{filesTitle}
			</label>
			<button
				onClick={e => submitPost()}
				className={loading ? 'loading' : 'none'}
			>
				{loading ? 'Učitavanje...' : 'Objavi'}
			</button>
			{loading ? (
				''
			) : (
				<p className={errorMsg.length > 0 ? 'error-msg' : 'hide'}>{errorMsg}</p>
			)}
		</div>
	);
};
