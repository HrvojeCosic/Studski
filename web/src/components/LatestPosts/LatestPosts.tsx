import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './LatestPosts.scss';

export const LatestPosts = () => {
	const [latestPostsJSX, setLatestPostsJSX] = useState<Array<JSX.Element>>([]);
	const [limitReached, setLimitReached] = useState<boolean>(false);

	const requestMorePosts = () => {
		axios
			.get(
				`http://localhost:8000/api/posts/getLatestPosts/${latestPostsJSX.length}`
			)
			.then(res => {
				const responsePostsJSX = res.data.posts.map((post: Post) => {
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
				const updatedLatestPosts = [...latestPostsJSX, ...responsePostsJSX];
				setLatestPostsJSX(updatedLatestPosts);
				if (res.data.message) setLimitReached(true);
			});
	};

	useEffect(() => {
		requestMorePosts();
	}, []);

	return (
		<div className='latest-posts-container'>
			<h1>Najnovije objave</h1>
			{latestPostsJSX}

			{!limitReached ? (
				<div
					onClick={() => {
						requestMorePosts();
					}}
					style={{ cursor: 'pointer' }}
				>
					Prikaži više
				</div>
			) : (
				'Nema više objava za pokazati...'
			)}
		</div>
	);
};
