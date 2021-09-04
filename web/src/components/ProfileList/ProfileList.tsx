import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileList.scss';

interface LeaderboardUser {
	points: number;
	username: string;
	faculty: string;
}

export const ProfileList: React.FC = () => {
	const [userListJSX, setUserListJSX] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:8000/api/users/getUserList').then(res => {
			const sortedUserList = res.data.userList.sort(
				(a: LeaderboardUser, b: LeaderboardUser) => {
					if (a.points > b.points) return -1;
					else if (b.points > a.points) return 1;
					else return 0;
				}
			);
			setUserListJSX(
				sortedUserList.map((user: LeaderboardUser) => {
					return (
						<Link
							to={`/korisnik/${user.username}`}
							className='profile-list-container'
							key={user.username}
						>
							<div className='featured-profile' key={user.username}>
								<p>
									{user.username} {user.faculty ? '- ' + user.faculty : ''}
								</p>
								<p>Kolegijalnost: {user.points}</p>
							</div>
						</Link>
					);
				})
			);
		});
	}, []);

	return (
		<div className='profile-list-container'>
			<h1>Tablica</h1>
			{userListJSX}
		</div>
	);
};
