import { Faculty } from '../FacultyList/FacultyList';
import './Searchbar.scss';

export const Searchbar: React.FC = () => {
	const search = (e: any) => {
		console.log(e.target.value);
	};

	return (
		<div>
			<input
				type='text'
				className='search'
				placeholder='Potraži'
				onChange={e => {
					search(e);
				}}
			/>
		</div>
	);
};
