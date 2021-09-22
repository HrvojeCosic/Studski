import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../actions/user';
import { getUser } from '../LoggedUserInfo/LoggedUserInfo';
import './Dropdown.scss';

interface DropdownProps {
	show: boolean;
	changeComponentToShow?: (component: string) => any;
}

export const Dropdown: React.FC<DropdownProps> = ({
	show,
	changeComponentToShow,
}) => {
	const loggedInUser = getUser();
	const dispatch = useDispatch();

	return (
		<div className={show ? 'dropdown-container' : 'none'}>
			{loggedInUser.sid.length === 0 ? (
				<div>
					<Link to='/prijava' className='link'>
						Prijavi se
					</Link>
					<Link to='/registracija' className='link'>
						Registriraj se
					</Link>
				</div>
			) : (
				<div>
					<Link to={`/korisnik/${loggedInUser.username}`} className='link'>
						{' '}
						{loggedInUser.username}
					</Link>
					<Link
						to='/'
						className='link'
						onClick={() => {
							dispatch(removeUser());
						}}
					>
						Odjavi se
					</Link>
				</div>
			)}

			<Link
				to='/'
				className='link'
				onClick={() =>
					changeComponentToShow && changeComponentToShow('FacultyList')
				}
			>
				Fakulteti
			</Link>
			<Link
				to='/'
				className='link'
				onClick={() =>
					changeComponentToShow && changeComponentToShow('ProfileList')
				}
			>
				Tablica
			</Link>
			<Link
				to='/'
				className='link'
				onClick={() =>
					changeComponentToShow && changeComponentToShow('CreatePostForm')
				}
			>
				Objavi materijal
			</Link>
		</div>
	);
};
