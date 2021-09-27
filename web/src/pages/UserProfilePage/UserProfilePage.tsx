import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import { NavBar } from '../../components/NavBar/NavBar';
import { store } from '../..';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import '../FacultyPostsPage/PostsPages.scss'; //same style as FacultyPostPage
import { toggleBurger } from '../../actions/render';
import Cookies from 'js-cookie';
import { setUser } from '../../actions/user';

interface UserParams {
	username: string;
}

export const UserProfilePage: React.FC = () => {
	const [postsJSX, setPostsJSX] = useState<Array<JSX.Element>>([]);
	const params: UserParams = useParams();

	const history = useHistory();
	const dispatch = useDispatch();

	useSelector(state => state);
	const { burger } = store.getState().renderState;

	useEffect(() => {
		if (burger) dispatch(toggleBurger());

		const sid = Cookies.get('connect.sid');
		axios
			.post('/users/checkAuth', sid, {
				withCredentials: true,
			})
			.then(res => {
				const { username, points, posts } = res.data.user;
				dispatch(setUser(username, points, posts, true));
			})
			.catch(() => {
				dispatch(setUser('', 0, [], true));
			});

		//SET DUMMY POST LIST WHILE LOADING
		let loadingTemplatePostList: Array<JSX.Element> = [];
		for (let i = 0; i < 5; i++) {
			loadingTemplatePostList.push(
				<div key={i}>
					<div className='post-container loading'>
						<div className='post-main'>
							<div className='post-upper-info'>
								<p>{i}</p>
								<p>{i}</p>
							</div>
							<p className='post-title'>{i}</p>
							<p>{i}</p>
						</div>
						<div className='post-side'>
							<p>{i}</p>
						</div>
					</div>
				</div>
			);
		}
		setPostsJSX(loadingTemplatePostList);

		axios
			.get(`/posts/getUserPosts/${params.username}`)
			.then(res => {
				setPostsJSX(
					res.data.posts.map((post: Post) => {
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
					})
				);
			})
			.catch(err => {
				alert(err.response.data.error);
				history.push('/');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.username, history, dispatch]);

	return (
		<div className='posts-page-container'>
			<NavBar />
			<Dropdown show={burger ? true : false} />
			<h1 style={burger ? { display: 'none' } : {}}>{params.username}</h1>
			{!burger && postsJSX}
		</div>
	);
};
