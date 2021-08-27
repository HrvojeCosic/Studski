import React from 'react';
import './NavBar.scss';
import { Searchbar } from '../Searchbar/Searchbar';
import logo from '../../design-tokens/images/7wnfJt.png';
import { Link } from 'react-router-dom';
import { removeUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../reducers/user';
import { getUser } from '../LoggedUserInfo/LoggedUserInfo';
import { Faculty } from '../FacultyList/FacultyList';

let loggedInUser: User;

export const NavBar: React.FC<{
	toggleShowPostForm: any;
	searchFaculties: (updatedFaculties: Array<Faculty>) => void;
}> = ({ toggleShowPostForm, searchFaculties }) => {
	loggedInUser = getUser();
	useSelector(state => state);

	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(removeUser());
	};

	return (
		<div className='header'>
			<img src={logo} alt='logo-img' />
			<Searchbar
				searchFaculties={(updatedFaculties: Array<Faculty>) => {
					searchFaculties(updatedFaculties);
				}}
			/>
			{loggedInUser.sid.length === 0 ? (
				<div className='header-btns'>
					<div className='mode-toggle-btn' />
					<Link to='/prijava' className='link'>
						<div className='log-in-btn'>Prijavi se</div>
					</Link>
					<Link to='/registracija' className='link'>
						<div className='sign-up-btn'>Registriraj se</div>
					</Link>
				</div>
			) : (
				<div className='header-btns'>
					<div className='mode-toggle-btn' />
					<div className='link' onClick={toggleShowPostForm}>
						Objavi materijal
					</div>
					<div className='log-out-btn' onClick={logOut}>
						Odjavi se
					</div>
				</div>
			)}
		</div>
	);
};
