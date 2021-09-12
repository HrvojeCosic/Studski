import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FacultyList.scss';

export interface Faculty {
	ime: string;
	grad: string;
	id: number;
}
interface OrganizedFacultyList {
	facultyArea_org: string;
	facultiesInArea_org: string[];
}

export const FacultyList: React.FC<{ faculties: Array<Faculty> }> = ({
	faculties,
}) => {
	let loadingFaculties = false;
	if (faculties.length > 0 && faculties[0].ime === '1') {
		loadingFaculties = true;
	}

	const [selectedAreaFaculties, setSelectedAreaFaculties] =
		useState<Array<JSX.Element>>();

	//GET UNIQUE AREAS(GRADOVI) IN SEPERATE ARRAY
	const facultyAreas: string[] = [];
	faculties.forEach((faculty: Faculty) => {
		if (!facultyAreas.includes(faculty.grad)) {
			facultyAreas.push(faculty.grad);
		}
	});

	const changeSelectedArea = (area: string) => {
		const selectedArea = facultyAreas.find(facultyArea => facultyArea === area);
		const facultiesInSelectedArea = organizedFacultyList.find(
			faculty => faculty.facultyArea_org === selectedArea
		);

		let facultiesInAreaJSX;
		if (facultiesInSelectedArea) {
			facultiesInAreaJSX = facultiesInSelectedArea.facultiesInArea_org.map(
				faculty => {
					return (
						<Link to={`/fakultet/${faculty}`} key={faculty} className='link'>
							{faculty}
						</Link>
					);
				}
			);
			setSelectedAreaFaculties(facultiesInAreaJSX);
		}
	};

	const facultyAreasJSX = facultyAreas.map(area => {
		return (
			<div
				key={area}
				onClick={() => changeSelectedArea(area)}
				className={loadingFaculties ? 'loading' : 'faculty-area'}
			>
				{area}
			</div>
		);
	});

	//FOR EACH AREA(GRAD), MAKE AN OBJECT & STORE IT IN organizedFacultyList[]
	let organizedFacultyList: OrganizedFacultyList[] = [];
	facultyAreas.forEach(facultyArea => {
		const facultiesInArea: string[] = [];
		faculties.forEach((faculty: Faculty) => {
			if (faculty.grad === facultyArea) {
				facultiesInArea.push(faculty.ime);
			}
		});

		facultiesInArea.sort(); //ALPHABETICALLY SORT

		organizedFacultyList.push({
			facultyArea_org: facultyArea,
			facultiesInArea_org: facultiesInArea,
		});
		const sortedFacultyList: OrganizedFacultyList[] = organizedFacultyList.sort(
			(firstObj: OrganizedFacultyList, secondObj: OrganizedFacultyList) => {
				if (
					firstObj.facultiesInArea_org.length >
					secondObj.facultiesInArea_org.length
				) {
					return -1;
				} else return 1;
			}
		);
		organizedFacultyList = sortedFacultyList;
	});

	return (
		<div className='main-container'>
			<h1>Fakulteti</h1>
			{selectedAreaFaculties ? (
				<div className='faculties-container'>
					<div
						className='exit-btn'
						onClick={() => setSelectedAreaFaculties(undefined)}
					>
						X
					</div>
					{selectedAreaFaculties}
				</div>
			) : (
				<div className='faculty-areas-container'>{facultyAreasJSX}</div>
			)}
		</div>
	);
};
