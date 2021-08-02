import React from 'react';
import './LoggedUserInfo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/user';
import { State } from '../../index';

export const LoggedUserInfo: React.FC = () => {
	const dispatch = useDispatch();
	const { username, points, posts } = dispatch(getUser()).payload.currentUser;
	useSelector((state: State) => state);

	let userPosts;
	if (posts) {
		userPosts = posts.map(post => {
			return (
				//TODO: style this div:
				<div key={post.id} className='user-post'>
					<p>Autor: {post.author}</p>
					<p>Fakultet: {post.faculty}</p>
					<p>Naslov: {post.title}</p>
					<p>Kolegijalnost: {post.points}</p>
					<p>Datum: {post.createdAt}</p>
				</div>
			);
		});
	} else userPosts = {};

	return (
		<div className='logged-user-info-container'>
			{!username ? (
				<p>prijavite se...</p>
			) : (
				<div>
					<div className='logged-user-main'>
						<h3>{username}</h3>
						<div className='user-numbers'>
							<p>Kolegijalnost: {points}</p>
							<p>Broj objava: {posts.length}</p>
						</div>
					</div>
					<div className='logged-user-list'>
						<h3 className='announce-text'>Objave:</h3>
						{userPosts}
					</div>
				</div>
			)}
		</div>
	);
};
