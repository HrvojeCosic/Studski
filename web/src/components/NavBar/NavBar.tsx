import React from 'react';
import { useSelector } from 'react-redux';
import './NavBar.scss';
import logo from '../../design-tokens/images/7wnfJt.png';
import { Link } from 'react-router-dom';
import { State } from '../../';

export const NavBar: React.FC = () => {
	const loggedIn = useSelector((state: State) => state.user.currentUser);

	return (
		<div className='header'>
			<img src={logo} alt='logo-img' />
			<input type='text' className='search' />
			{!loggedIn ? (
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
					<div className='log-out-btn'>Odjavi se</div>
				</div>
			)}
		</div>
	);
};
