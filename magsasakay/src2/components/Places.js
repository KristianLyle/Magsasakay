import React, { useState } from 'react';
import '../css/Places.css';

const Places = ({ placesData, onFilter }) => {
	const [searchInput, setSearchInput] = useState('');
	const [isSearchClicked, setIsSearchClicked] = useState(false);
	const [filteredPlaces, setFilteredPlaces] = useState([]);

	// Update search input
	const handleSearchChange = (event) => {
		setSearchInput(event.target.value);
	};

	// Filter places based on all categories and search input
	const filterPlaces = () => {
		const lowerCaseSearchInput = searchInput.toLowerCase();
		const newFilteredPlaces = placesData.filter(
			(place) =>
				place.name.toLowerCase().includes(lowerCaseSearchInput) ||
				place.category.toLowerCase().includes(lowerCaseSearchInput)
		);

		setFilteredPlaces(newFilteredPlaces);
		setIsSearchClicked(true);

		// Pass the filtered places to the parent component
		onFilter(newFilteredPlaces.map((place) => placesData.indexOf(place)));
	};

	return (
		<div className='places-container'>
			<div className='places-title'>
				<h3>Places in Iloilo</h3>
			</div>
			<div className='places-contents'>
				<div className='places-input'>
					<div className='places-search'>
						<input
							type='text'
							placeholder='Search'
							value={searchInput}
							onChange={handleSearchChange}
						/>
						<button onClick={filterPlaces}>Search</button>
					</div>
					<div className='horizontal-divider'></div>
					<div className='places'>
						{isSearchClicked &&
							filteredPlaces.map((place, index) => (
								<button key={index}>{place.name}</button>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Places;
