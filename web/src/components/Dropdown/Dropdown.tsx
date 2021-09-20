import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../actions/user';
import { getUser } from '../LoggedUserInfo/LoggedUserInfo';
import './Dropdown.scss';

export const Dropdown: React.FC<{ show: boolean }> = show => {
	const loggedInUser = getUser();
	const dispatch = useDispatch();

	return (
		<div className={show.show ? 'dropdown-container' : 'none'}>
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

			<Link to='/' className='link'>
				Najnovije objave (uskoro)
			</Link>
			<Link to='/' className='link'>
				Tablica (uskoro)
			</Link>
			<Link to='/' className='link'>
				Objavi materijal (uskoro)
			</Link>
		</div>
	);
};
