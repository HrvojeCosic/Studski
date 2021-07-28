import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FacultyList } from '../../components/FacultyList/FacultyList';
import { LoggedUserInfo } from '../../components/LoggedUserInfo/LoggedUserInfo';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileList } from '../../components/ProfileList/ProfileList';
import './HomePage.scss';

export const HomePage: React.FC = () => {
	useEffect(() => {
		const sid = Cookies.get('connect.sid');
		axios
			.post('http://localhost:8000/api/users/checkAuth', sid, {
				withCredentials: true,
			})
			.then(res => {
				console.log(res.data.message);
			})
			.catch(err => {
				console.log(err.response);
			});
	}, []);
	return (
		<div>
			<NavBar />
			<div className='home-page-body'>
				<FacultyList />
				<ProfileList />
				<LoggedUserInfo />
			</div>
		</div>
	);
};
