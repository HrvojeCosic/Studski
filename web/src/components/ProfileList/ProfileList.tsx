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
	const [userListJSX, setUserListJSX] = useState<Array<JSX.Element>>([]);
	const [limitReached, setLimitReached] = useState<boolean>(false);

	const requestMoreUsers = () => {
		axios.get(`/users/requestUsers/${userListJSX.length}`).then(res => {
			if (res.data.message) setLimitReached(true);

			const sortedUserList = res.data.userList.sort(
				(a: LeaderboardUser, b: LeaderboardUser) => {
					if (a.points > b.points) return -1;
					else if (b.points > a.points) return 1;
					else return 0;
				}
			);

			const responseUsersJSX = sortedUserList.map((user: LeaderboardUser) => {
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
			});

			const updatedUserList = [...userListJSX, ...responseUsersJSX];
			setUserListJSX(updatedUserList);
		});
	};

	useEffect(() => {
		//SET DUMMY USER LIST WHILE LOADING
		let loadingTemplateUserListJSX: Array<JSX.Element> = [];
		for (let i = 0; i < 10; i++) {
			loadingTemplateUserListJSX.push(
				<div className='profile-list-container ' key={i}>
					<div className='loading'>
						<p>a </p>
						<p>a </p>
					</div>
				</div>
			);
		}
		setUserListJSX(loadingTemplateUserListJSX);

		requestMoreUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='profile-list-container'>
			<h1>Tablica</h1>
			<div>{userListJSX}</div>
			{!limitReached ? (
				<p onClick={requestMoreUsers} style={{ cursor: 'pointer' }}>
					Prikaži više
				</p>
			) : (
				'Nema više korisnika za pokazati...'
			)}
		</div>
	);
};
