import React from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { State } from '../../index';
import './LoggedUserInfo.scss';
import { Link } from 'react-router-dom';
import { LatestPosts } from '../LatestPosts/LatestPosts';

export const getUser = () => {
	let sid = Cookies.get('connect.sid');
	if (!sid) sid = '';

	const stringifiedCurrentUser = localStorage.getItem('currentUser');
	if (!stringifiedCurrentUser) {
		return { username: '', points: 0, posts: [], sid };
	}

	let currentUser = JSON.parse(stringifiedCurrentUser);
	currentUser.sid = sid;
	return currentUser;
};

export const LoggedUserInfo: React.FC = () => {
	const { username, points, posts } = getUser();
	useSelector((state: State) => state);

	let userPosts = [];
	let limit;

	if (posts) {
		posts.length > 5 ? (limit = 5) : (limit = posts.length);
		//LAST FIVE POSTS
		for (let i = posts.length - 1; i > posts.length - limit - 1; i--) {
			userPosts.push(
				<Link to={`/materijal/${posts[i].id}`} key={posts[i].id}>
					<div className='user-post'>
						<p>Fakultet: {posts[i].faculty}</p>
						<p>Naslov: {posts[i].title}</p>
						<p>Kolegijalnost: {posts[i].points}</p>
						<p>Datum: {posts[i].createdAt}</p>
					</div>
				</Link>
			);
		}
	} else userPosts = [];

	return (
		<div className='logged-user-info-container'>
			{!username ? (
				<LatestPosts />
			) : (
				<div>
					<div className='logged-user-main'>
						<Link to={`/korisnik/${username}`}>
							<h3>{username}</h3>
						</Link>
						<div className='user-numbers'>
							<p>Kolegijalnost: {points}</p>
							<p>Broj objava: {posts.length}</p>
						</div>
					</div>
					<div className='logged-user-list'>
						{userPosts.length > 0 && (
							<h3 className='announce-text'>Zadnje objave:</h3>
						)}
						{userPosts}
						{limit === 5 && (
							<Link to={`/korisnik/${username}`}>Prikaži sve</Link>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
