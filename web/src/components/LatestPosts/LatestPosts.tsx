import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './LatestPosts.scss';

export const LatestPosts = () => {
	const [latestPosts, setLatestPosts] = useState<Array<Post>>([]);
	const [limitReached, setLimitReached] = useState<boolean>(false);

	const requestMorePosts = () => {
		axios
			.get(
				`http://localhost:8000/api/posts/getLatestPosts/${latestPosts.length}`
			)
			.then(res => {
				const updatedLatestPosts = [...latestPosts, ...res.data.posts];
				setLatestPosts(updatedLatestPosts);
				if (res.data.message) setLimitReached(true);
			});
	};

	useEffect(() => {
		requestMorePosts();
	}, []);

	const latestPostsJSX = latestPosts.map((post, index) => {
		return (
			<Link to={`/materijal/${post.id}`} key={post.id}>
				<div className='latest-post'>
					<p>{post.title}</p>
					<p>{post.faculty}</p>
					<p>{post.createdAt}</p>
					<p>Kolegijalnost: {post.points}</p>
					<p>{post.author}</p>
				</div>
			</Link>
		);
	});

	return (
		<div className='latest-posts-container'>
			<h1>Najnovije objave</h1>
			{latestPostsJSX}

			{!limitReached ? (
				<div onClick={requestMorePosts} style={{ cursor: 'pointer' }}>
					Prikaži više
				</div>
			) : (
				'Nema više objava za pokazati...'
			)}
		</div>
	);
};
