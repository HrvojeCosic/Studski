import React from 'react';
import './NavBar.scss';
import logo from '../../design-tokens/images/7wnfJt.png';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {
	return (
		<div className='header'>
			{/* TODO: logoimg, loginbtn,logoutbtn i signupbtn u router linkove umjesto div-ove*/}
			<img src={logo} alt='logo-img' />
			<input type='text' className='search' />
			<div className='header-btns'>
				<div className='mode-toggle-btn' />
				<Link to='/prijava' className='link'>
					<div className='log-in-btn'>Prijavi se</div>
				</Link>
				<Link to='/registracija' className='link'>
					<div className='sign-up-btn'>Registriraj se</div>
				</Link>
			</div>
		</div>
	);
};
