import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { updateUserPosts } from '../../actions/user';
import { NavBar } from '../../components/NavBar/NavBar';
import { store } from '../..';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { toggleBurger } from '../../actions/render';
import { Post, User } from '../../reducers/user';
import useAuth from '../../hooks/useAuth';
import setImage from './setImage';
import './PostPage.scss';

interface PostParams {
	postID: string;
}

interface PostVote {
	voted: boolean;
	allowVote: boolean;
}

interface PostFile {
	createdAt: string;
	fileName: string;
	id: number;
	post_id: number;
	updatedAt: string;
}

interface PostInfo extends Post {
	files: Array<PostFile>;
	loading: boolean;
	deletePrompt: boolean;
}

const initialPostInfoState = {
	author: '',
	faculty: '',
	title: '',
	points: 0,
	createdAt: new Date(),
	id: 0,
	files: [],
	loading: true,
	deletePrompt: false,
};
const initialVoteState = {
	voted: false,
	allowVote: false,
};

export const PostPage: React.FC = () => {
	const [post, setPost] = useState<PostInfo>(initialPostInfoState);
	const [vote, setVote] = useState<PostVote>(initialVoteState);

	const params: PostParams = useParams();

	const dispatch = useDispatch();
	const history = useHistory();
	const { burger } = store.getState().renderState;
	const user: User = store.getState().userState;
	useSelector(state => state);

	useAuth();

	useEffect(() => {
		const { username, loaded } = user;
		if (username) {
			axios.get(`/posts/checkVoted/${username}/${params.postID}`).then(res => {
				if (res.data.message === 'already voted')
					setVote({ voted: true, allowVote: true });
				else if (res.data.message === 'has not voted')
					setVote({ voted: false, allowVote: true });
			});
		} else if (!username && loaded) {
			setVote({ voted: false, allowVote: false });
		}
	}, [params.postID, user]);

	useEffect(() => {
		if (burger) dispatch(toggleBurger());

		const cancelTokenSource = axios.CancelToken.source();

		axios
			.get(`/posts/getPost/${params.postID}`)
			.then(res => {
				const { post, files } = res.data;
				setPost({ ...post, files, loading: false });
			})
			.catch(err => {
				alert(err.response.data.error);
				history.push('/');
			});

		return () => {
			cancelTokenSource.cancel('component unmounted, requests cancelled');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history, dispatch]);

	const voteForPost = () => {
		const postID = params.postID;
		const postAuthor = post?.author;

		const voter = user.username;
		axios
			.patch('/posts/voteForPost', {
				postID,
				postAuthor,
				voter,
			})
			.then(res => {
				if (res.data.message === 'upvoted') {
					if (post) post.points++;
					setVote({ voted: true, allowVote: true });
					dispatch(updateUserPosts('upvote post', undefined, post));
				} else if (res.data.message === 'downvoted') {
					if (post) post.points--;
					setVote({ voted: false, allowVote: true });
					dispatch(updateUserPosts('downvote post', undefined, post));
				}
			});
	};

	const downloadFile = (fileName: string) => {
		const domain =
			process.env.NODE_ENV === 'production'
				? process.env.REACT_APP_PROD_URL
				: process.env.REACT_APP_DEV_URL;
		window.open(`${domain}/posts/downloadFile/${fileName}`);
	};

	const deletePost = () => {
		axios.delete(`/posts/deletePost/${params.postID}`).then(res => {
			dispatch(
				updateUserPosts('delete post', undefined, undefined, res.data.post)
			);
			history.push('/');
		});
	};

	const filesJSX = post?.files.map((file: PostFile) => {
		const readableFileName = file.fileName.slice(0, -13); //Date.now() ADDS EXACTLY 13 CHARACTERS
		const image = setImage(readableFileName);

		return (
			<div key={file.id}>
				<div
					onClick={() => {
						downloadFile(file.fileName);
					}}
				>
					<div className='downloadable'>
						{image}
						<div className='file-name'>{readableFileName}</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className='main-postpage-container'>
			<NavBar />
			<Dropdown show={burger ? true : false} />
			<div
				className={post?.loading ? 'post loading' : 'post'}
				style={burger ? { display: 'none' } : {}}
			>
				<div className='upper-info'>
					<p className={'post-title'}>{post?.title}</p>
					{user.username === post?.author && !post?.loading && (
						<img
							src='../../icons/otherIcons/delete-item.png'
							alt='delete post button'
							onClick={() => {
								post.deletePrompt !== true &&
									setPost({ ...post, deletePrompt: true });
							}}
						/>
					)}
				</div>
				{post?.deletePrompt && (
					<div>
						<h3 style={{ fontWeight: 300 }}>
							Jeste li sigurni da želite obrisati ovu objavu?
						</h3>
						<div onClick={deletePost} className='delete-post-yes'>
							DA
						</div>
						<div
							className='delete-post-no'
							onClick={() => {
								setPost({ ...post, deletePrompt: false });
							}}
						>
							NE
						</div>
					</div>
				)}
				<div className='middle-upper-info'>
					<Link to={`/korisnik/${post?.author}`} className='post-faculty'>
						{post?.author}
					</Link>
					<Link to={`/fakultet/${post?.faculty}`} className='post-faculty'>
						{post?.faculty}
					</Link>
				</div>
				{!post?.loading && (
					<div className='middle-info'>
						<div className='main'>
							<p>Kolegijalnost: {post?.points}</p>
							<p className='post-date'>Objavljeno {post?.createdAt}</p>
						</div>
						<div className='aside'>
							{vote.allowVote && post?.author !== user.username && (
								<div onClick={voteForPost}>
									<p className={vote.voted ? 'voted' : 'non-voted'}>KORISNO?</p>
								</div>
							)}
						</div>
					</div>
				)}
				{filesJSX}
			</div>
		</div>
	);
};
