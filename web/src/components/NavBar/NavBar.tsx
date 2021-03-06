import React from 'react';
import './NavBar.scss';
import logo from '../../design-tokens/images/7wnfJt.png';
import { Link, useLocation } from 'react-router-dom';
import { removeUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBurger } from '../../actions/render';
import { store } from '../..';

export const NavBar: React.FC<{
	toggleShowPostForm?: any;
}> = ({ toggleShowPostForm }) => {
	const { username, loaded } = store.getState().userState;
	useSelector(state => state);

	const location = useLocation();
	const dispatch = useDispatch();

	const { burger } = store.getState().renderState;

	const logOut = () => {
		dispatch(removeUser());
	};

	return (
		<div className='header'>
			<div
				className='dropdown'
				onClick={() => {
					dispatch(toggleBurger());
				}}
			>
				<div className={!burger ? 'dropdown-burger' : 'dropdown-exit'}></div>
			</div>
			<Link to='/' className='link'>
				<div className='branding'>
					<img src={logo} alt='logo-img' />
					<h1>Studski</h1>
				</div>
			</Link>
			{!username && loaded ? (
				<div className='header-btns'>
					<Link to='/prijava' className='link'>
						<div className='log-in-btn'>Prijavi se</div>
					</Link>
					<Link to='/registracija' className='link'>
						<div className='sign-up-btn'>Registriraj se</div>
					</Link>
				</div>
			) : (
				loaded && (
					<div className='header-btns'>
						{location.pathname === '/' && (
							<div className='link' onClick={toggleShowPostForm}>
								Objavi materijal
							</div>
						)}

						<div className='log-out-btn' onClick={logOut}>
							Odjavi se
						</div>
					</div>
				)
			)}
		</div>
	);
};
