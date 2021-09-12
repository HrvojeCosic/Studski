import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { updateUserPosts } from '../../actions/user';
import { NavBar } from '../../components/NavBar/NavBar';
import './PostPage.scss';

interface PostParams {
	postID: string;
}

interface PostFile {
	createdAt: string;
	fileName: string;
	id: number;
	post_id: number;
	updatedAt: string;
}

export const PostPage: React.FC = () => {
	const [post, setPost] = useState<any>({}); //"any" BECAUSE OF createdAt PROPERTY IN Post TYPE‚
	const [voted, setVoted] = useState<boolean>(false);
	const [files, setFiles] = useState<Array<PostFile>>([]);
	const [allowVote, setAllowVote] = useState<boolean>(true);
	const [deletePrompt, setDeletePrompt] = useState<boolean>(false);
	const [visitor, setVisitor] = useState<string>('');
	const params: PostParams = useParams();

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source();
		const sid = Cookies.get('connect.sid');
		axios
			.post('http://localhost:8000/api/users/checkAuth', sid, {
				withCredentials: true,
			})
			.then(res => {
				setVisitor(res.data.message);
			});

		axios
			.get(`http://localhost:8000/api/posts/getPost/${params.postID}`)
			.then(res => {
				setPost(res.data.post);
				setFiles(res.data.files);
			})
			.catch(err => {
				alert(err.response.data.error);
				history.push('/');
			});

		const user = localStorage.getItem('currentUser');
		let username;
		if (!user) setAllowVote(false);
		else if (user) username = JSON.parse(user).username;

		axios
			.get(
				`http://localhost:8000/api/posts/checkVoted/${username}/${params.postID}`
			)
			.then(res => {
				if (res.data.message === 'already voted') setVoted(true);
				else if (res.data.message === 'has not voted') setVoted(false);
			});

		return () => {
			cancelTokenSource.cancel('component unmounted, requests cancelled');
		};
	}, [params.postID, history]);

	const voteForPost = () => {
		const postID = params.postID;
		const postAuthor = post.author;

		const user = localStorage.getItem('currentUser');
		let voter = '';
		if (user) voter = JSON.parse(user).username;

		axios
			.patch('http://localhost:8000/api/posts/voteForPost', {
				postID,
				postAuthor,
				voter,
			})
			.then(res => {
				if (res.data.message === 'upvoted') {
					post.points++;
					setVoted(true);
					dispatch(updateUserPosts('upvote post', undefined, post));
				} else if (res.data.message === 'downvoted') {
					post.points--;
					setVoted(false);
					dispatch(updateUserPosts('downvote post', undefined, post));
				}
			});
	};

	const downloadFile = (fileName: string) => {
		window.open(`http://localhost:8000/api/posts/downloadFile/${fileName}`);
	};

	const deletePost = () => {
		axios
			.delete(`http://localhost:8000/api/posts/deletePost/${params.postID}`)
			.then(res => {
				dispatch(
					updateUserPosts('delete post', undefined, undefined, res.data.post)
				);
				history.push('/');
			});
	};

	const filesJSX = files.map(file => {
		const readableFileName = file.fileName.slice(0, -13); //Date.now() ADDS EXACTLY 13 CHARACTERS
		let image;
		const setImage = (src: string) => {
			image = <img src={src} className='image' alt={'extension icon'} />;
		};
		switch (readableFileName.slice(-3)) {
			case 'pdf':
				setImage('../../icons/extensionIcons/pdf.png');
				break;
			case 'doc':
			case 'docx':
			case 'docm':
			case 'rtf':
			case 'dot':
			case 'dotx':
			case 'dotm':
			case 'odt':
				setImage('../../icons/extensionIcons/doc.png');
				break;
			case 'mht':
			case 'mhtml':
			case 'htm':
			case 'html':
				setImage('../../icons/extensionIcons/html.png');
				break;
			case 'css':
				setImage('../../icons/extensionIcons/css.png');
				break;
			case 'jpg':
			case 'jpeg':
				setImage('../../icons/extensionIcons/jpg.png');
				break;
			case 'mp3':
				setImage('../../icons/extensionIcons/mp3.png');
				break;
			case 'ppt':
				setImage('../../icons/extensionIcons/ppt.png');
				break;
			case 'xls':
				setImage('../../icons/extensionIcons/xls.png');
				break;
			case 'zip':
				setImage('../../icons/extensionIcons/zip.png');
				break;
			case 'txt':
				setImage('../../icons/extensionIcons/txt.png');
				break;
			default:
				setImage('../../icons/extensionIcons/other.png');
		}

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
			<div className='post'>
				<div className='upper-info'>
					<p className='post-title'>{post.title}</p>
					{visitor === post.author ? (
						<img
							src='../../icons/otherIcons/delete-item.png'
							alt=''
							onClick={() => {
								setDeletePrompt(true);
							}}
						/>
					) : null}
				</div>
				{deletePrompt ? (
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
								setDeletePrompt(false);
							}}
						>
							NE
						</div>
					</div>
				) : null}
				<div className='middle-upper-info'>
					<Link to={`/korisnik/${post.author}`} className='post-faculty'>
						{post.author}
					</Link>
					<Link to={`/fakultet/${post.faculty}`} className='post-faculty'>
						{post.faculty}
					</Link>
				</div>
				<div>
					<p className='post-date'>Objavljeno {post.createdAt}</p>
					<p>Kolegijalnost: {post.points}</p>
					{allowVote && post.author !== visitor ? (
						<div onClick={voteForPost}>
							<p className={voted ? 'voted' : 'non-voted'}>KORISNO?</p>
						</div>
					) : null}
				</div>
				{filesJSX}
			</div>
		</div>
	);
};
