import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Faculty, FacultyList } from '../../components/FacultyList/FacultyList';
import { LoggedUserInfo } from '../../components/LoggedUserInfo/LoggedUserInfo';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileList } from '../../components/ProfileList/ProfileList';
import './HomePage.scss';
import { CreatePostForm } from '../../components/CreatePostForm/CreatePostForm';
import { store } from '../..';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBurger } from '../../actions/render';

export const HomePage: React.FC = () => {
	const [showForm, setShowForm] = useState(false);
	const [faculties, setFaculties] = useState<Array<Faculty>>([]);

	const dispatch = useDispatch();
	const { burger } = store.getState().renderState;
	useSelector(state => state);

	//NavBar prop:
	const toggleShowPostForm = () => {
		setShowForm(!showForm);
	};

	useEffect(() => {
		burger && dispatch(toggleBurger());

		//FIND USER
		const sid = Cookies.get('connect.sid');
		axios
			.post('/users/checkAuth', sid, {
				withCredentials: true,
			})
			.catch(err => {
				console.log('Korisnik nije prijavljen');
			});

		//SET DUMMY FACULTY LIST WHILE LOADING
		let loadingTemplateFacultyList: Array<Faculty> = [];
		for (let i = 1; i < 19; i++) {
			loadingTemplateFacultyList.push({
				ime: i.toString(),
				grad: `gradPR${i}`,
				id: i,
			});
		}
		setFaculties(loadingTemplateFacultyList);

		//GET FACULTIES
		fetch('faculties.json')
			.then(res => {
				return res.json();
			})
			.then(json => {
				setFaculties(json);
			});
	}, []);
	return (
		<div>
			<NavBar toggleShowPostForm={toggleShowPostForm} />
			<Dropdown show={burger ? true : false} />
			<div className='home-page-body' style={burger ? { display: 'none' } : {}}>
				<ProfileList />
				<FacultyList faculties={faculties} />
				{showForm ? (
					<CreatePostForm faculties={faculties} />
				) : (
					<LoggedUserInfo />
				)}
			</div>
		</div>
	);
};
