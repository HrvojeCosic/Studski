import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		const userCheck = {
			username,
			password,
		};
		axios
			.post('http://localhost:8000/api/users/login', userCheck, {
				withCredentials: true,
			})
			.then(res => {
				console.log(res.data.message);
			})
			.catch(err => {
				console.log(err.response.data.error);
			});
	};
	return (
		<div>
			<div className='log-in-container'>
				<h2>Prijavi se</h2>
				<form className='loginbox'>
					<input
						placeholder='Korisničko ime'
						type='text'
						onChange={e => {
							setUsername(e.target.value);
						}}
					/>
					<input
						placeholder='Lozinka'
						type='password'
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<button id='submit' onClick={login}></button>
				</form>
				<div className='links'>
					<Link to='/' className='back-to-hp'>
						Natrag na početnu stranicu
					</Link>
					<Link to='/registracija' className='sign-up-instead'>
						Nemate račun? Registrirajte se
					</Link>
				</div>
			</div>
		</div>
	);
};
