import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FacultyList } from '../../components/FacultyList/FacultyList';
import { LoggedUserInfo } from '../../components/LoggedUserInfo/LoggedUserInfo';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileList } from '../../components/ProfileList/ProfileList';
import './HomePage.scss';
import { CreatePostForm } from '../../components/CreatePostForm/CreatePostForm';

export const HomePage: React.FC = () => {
	const [showForm, setShowForm] = useState(false);

	//NavBar prop:
	const toggleShowPostForm = () => {
		setShowForm(!showForm);
	};

	useEffect(() => {
		const sid = Cookies.get('connect.sid');
		axios
			.post('http://localhost:8000/api/users/checkAuth', sid, {
				withCredentials: true,
			})
			.catch(err => {
				console.log(err.response);
			});
	}, []);
	return (
		<div>
			<NavBar toggleShowPostForm={toggleShowPostForm} />
			<div className='home-page-body'>
				<FacultyList />
				<ProfileList />
				{showForm ? <CreatePostForm /> : <LoggedUserInfo />}
			</div>
		</div>
	);
};
