import React from 'react';
import { FacultyList } from '../../components/FacultyList/FacultyList';
import { LoggedUserInfo } from '../../components/LoggedUserInfo/LoggedUserInfo';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileList } from '../../components/ProfileList/ProfileList';
import './HomePage.scss';

export const HomePage: React.FC = () => {
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
