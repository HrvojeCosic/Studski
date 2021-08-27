import { Faculty } from '../FacultyList/FacultyList';
import './Searchbar.scss';

interface Props {
	searchFaculties: (updatedFaculties: Array<Faculty>) => void;
}

export const Searchbar: React.FC<Props> = ({ searchFaculties }) => {
	const search = (e: any) => {
		const searchedTerm = e.target.value;
		fetch('faculties.json')
			.then(res => {
				return res.json();
			})
			.then(faculties => {
				const filtered = faculties.filter((faculty: Faculty) =>
					faculty.ime.includes(
						searchedTerm.charAt(0).toUpperCase() + searchedTerm.slice(1)
					)
				);
				searchFaculties(filtered);
			});
	};

	return (
		<div>
			<input
				type='text'
				className='search'
				placeholder='Potraži fakultet'
				onChange={e => {
					search(e);
				}}
			/>
		</div>
	);
};
