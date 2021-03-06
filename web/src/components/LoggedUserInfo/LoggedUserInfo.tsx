import React from 'react';
import { useSelector } from 'react-redux';
import { State, store } from '../../index';
import './LoggedUserInfo.scss';
import { Link } from 'react-router-dom';
import { LatestPosts } from '../LatestPosts/LatestPosts';
import { User } from '../../reducers/user';

export const LoggedUserInfo: React.FC = () => {
	const user: User = store.getState().userState;
	const { username, posts, points, loaded } = user;
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

	if (user.loaded === false) {
		for (let i = 0; i < 5; i++) {
			userPosts.push(
				<div key={i}>
					<div className='user-post loading'>
						<p>x</p>
						<p>x</p>
						<p>x</p>
						<p>x</p>
					</div>
				</div>
			);
		}
	}

	return (
		<div className='logged-user-info-container'>
			{!username && loaded ? (
				<LatestPosts />
			) : (
				<div>
					<div className='logged-user-main'>
						<Link to={`/korisnik/${username}`}>
							<h3>{username}</h3>
						</Link>
						{loaded && (
							<div className='user-numbers'>
								<p>Kolegijalnost: {points}</p>
								<p>Broj objava: {posts.length}</p>
							</div>
						)}
					</div>
					<div className='logged-user-list'>
						{userPosts.length > 0 && loaded && (
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
