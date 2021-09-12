import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import '../FacultyPostsPage/PostsPages.scss'; //same style as FacultyPostPage
import { NavBar } from '../../components/NavBar/NavBar';

interface UserParams {
	username: string;
}

export const UserProfilePage: React.FC = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const params: UserParams = useParams();

	const history = useHistory();

	const postsJSX = posts.map((post: Post) => {
		return (
			<Link to={`/materijal/${post.id}`} key={post.id}>
				<div className='post-container'>
					<div className='post-main'>
						<div className='post-upper-info'>
							<p>{post.createdAt}</p>
							<p>{post.faculty}</p>
						</div>
						<p className='post-title'>{post.title}</p>
						<p>{post.fileName}</p>
					</div>
					<div className='post-side'>
						<img src='../../icons/otherIcons/heart.png' alt='' />
						<p>{post.points}</p>
					</div>
				</div>
			</Link>
		);
	});

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/getUserPosts/${params.username}`)
			.then(res => {
				setPosts(res.data.posts);
			})
			.catch(err => {
				alert(err.response.data.error);
				history.push('/');
			});
	}, [params.username, history]);

	return (
		<div className='posts-page-container'>
			<NavBar />
			<h1>{params.username}</h1>
			{postsJSX}
		</div>
	);
};
