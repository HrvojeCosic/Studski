import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './LatestPosts.scss';

export const LatestPosts = () => {
	const [latestPosts, setLatestPosts] = useState<Array<Post>>([]);
	const [limit, setLimit] = useState<number>(0);

	useEffect(() => {
		axios.get('http://localhost:8000/api/posts/getLatestPosts').then(res => {
			setLatestPosts(res.data.posts);
			latestPosts.length > 5 ? setLimit(5) : setLimit(latestPosts.length);
		});
	}, [latestPosts.length]);

	const latestPostsJSX = latestPosts.map((post, index) => {
		do {
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
		} while (index < limit);
	});

	const showMore = () => {
		setLimit(limit + 5);
	};

	return (
		<div className='latest-posts-container'>
			<h1>Najnovije objave</h1>
			{latestPostsJSX}
			{limit > latestPosts.length ? (
				'Nema više objava za prikazati...'
			) : (
				<div onClick={showMore} style={{ cursor: 'pointer' }}>
					Prikaži više
				</div>
			)}
		</div>
	);
};
