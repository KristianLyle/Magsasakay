import React, { useState, useEffect } from 'react';
import placesData from './Places.json';
import NearestRouteComponent from './NearestRoute';
import calculateIntersection from './RouteIntersection';

const FindRoute = ({ onIntersectionChange }) => {
	const [searchQueryFrom, setSearchQueryFrom] = useState('');
	const [filteredPlacesFrom, setFilteredPlacesFrom] = useState([]);
	const [fromLocation, setFromLocation] = useState('');
	const [fromCoordinates, setFromCoordinates] = useState(null);
	const [nearestRoutesFrom, setNearestRoutesFrom] = useState(null);

	const [searchQueryTo, setSearchQueryTo] = useState('');
	const [filteredPlacesTo, setFilteredPlacesTo] = useState([]);
	const [toLocation, setToLocation] = useState('');
	const [toCoordinates, setToCoordinates] = useState(null);
	const [nearestRoutesTo, setNearestRoutesTo] = useState(null);

	const [selectedIntersection, setSelectedIntersection] = useState(null);

	const handleSearchFrom = (event) => {
		setSearchQueryFrom(event.target.value);
		setFromLocation(event.target.value);
		setFilteredPlacesFrom([]);
		setSelectedIntersection(null); // Reset selected intersection when "From" textbox changes
		handleSearch(event.target.value, setFilteredPlacesFrom, setSearchQueryFrom);
	};

	const handleSearchTo = (event) => {
		setSearchQueryTo(event.target.value);
		setToLocation(event.target.value);
		setFilteredPlacesTo([]);
		setSelectedIntersection(null); // Reset selected intersection when "To" textbox changes
		handleSearch(event.target.value, setFilteredPlacesTo, setSearchQueryTo);
	};

	const handleSearch = (query, setFilteredPlaces, setSearchQuery) => {
		setSearchQuery(query);
		if (query.trim() === '') {
			setFilteredPlaces([]);
		} else {
			const startsWithNameQuery = [];
			const containsNameQuery = [];
			const startsWithCategoryQuery = [];
			const containsCategoryQuery = [];
			const lowercaseQuery = query.toLowerCase();
			for (const place of placesData) {
				const lowercaseName = place.name.toLowerCase();
				const lowercaseCategory = place.category.toLowerCase();
				if (lowercaseName.startsWith(lowercaseQuery)) {
					startsWithNameQuery.push(place);
				} else if (lowercaseName.includes(lowercaseQuery)) {
					containsNameQuery.push(place);
				} else if (lowercaseCategory.startsWith(lowercaseQuery)) {
					startsWithCategoryQuery.push(place);
				} else if (lowercaseCategory.includes(lowercaseQuery)) {
					containsCategoryQuery.push(place);
				}
			}
			const filtered = startsWithNameQuery.concat(
				containsNameQuery,
				startsWithCategoryQuery,
				containsCategoryQuery
			);
			setFilteredPlaces(filtered);
		}
	};

	const handleSuggestionClickFrom = (place) => {
		setSearchQueryFrom(place.name);
		setFromLocation(place.name);
		setFromCoordinates(place.location); // Set the coordinates for 'from' location
		setFilteredPlacesFrom([]);
		const nearestRoutes = NearestRouteComponent(place.location);
		setNearestRoutesFrom(nearestRoutes);
	};

	const handleSuggestionClickTo = (place) => {
		setSearchQueryTo(place.name);
		setToLocation(place.name);
		setToCoordinates(place.location); // Set the coordinates for 'to' location
		setFilteredPlacesTo([]);
		const nearestRoutes = NearestRouteComponent(place.location);
		setNearestRoutesTo(nearestRoutes);
	};

	const suggestionStyle = { cursor: 'pointer' };

	const handleRadioChange = (intersection) => {
		if (
			selectedIntersection &&
			selectedIntersection.routeFrom === intersection.routeFrom &&
			selectedIntersection.routeTo === intersection.routeTo
		) {
			// If the same intersection is clicked again, deselect it
			setSelectedIntersection(null);
		} else {
			// Otherwise, select the new intersection
			setSelectedIntersection(intersection);
		}
	};

	let intersectionPoints = null;
	if (nearestRoutesFrom && nearestRoutesTo) {
		intersectionPoints = calculateIntersection(
			nearestRoutesFrom,
			nearestRoutesTo
		).map((intersection) => ({
			...intersection,
			fromLocation,
			toLocation,
			fromCoordinates,
			toCoordinates,
		}));
	}

	useEffect(() => {
		// Call the onIntersectionChange function with the updated selectedIntersection
		onIntersectionChange(selectedIntersection ? [selectedIntersection] : []);
	}, [selectedIntersection, onIntersectionChange]);

	return (
		<div className='find-route-container font-Montserrat bg-gradient-to-t from-orange-400 to-blue-600 border-[#160E3D] border-[1.5px]'>
			<div className='find-route-title mt-[50px]'>
				<h1 className='font-extrabold text-center text-[400%] text-white'>
					Find Route
				</h1>{' '}
				<br />
				<div className='find-route-forms max-w-[600px] w-[600px] '>
					<div className='ml-[10px] text-center'>
						<label className=' font-Montserrat font-medium text-white'>
							From:{' '}
						</label>
						<input
							className='rounded-xl w-[375px]'
							type='text'
							value={fromLocation}
							onChange={handleSearchFrom}
							placeholder='Enter a starting point'
						/>
						{searchQueryFrom.trim() !== '' && (
							<div className='place-suggestions font-Montserrat font-normal text-white bg-[#160E3D] rounded-xl text-left max-h-[500px] overflow-auto'>
								{filteredPlacesFrom.map((place, index) => (
									<div
										className='font-medium p-[5px] ml-[5px]'
										key={index}
										style={suggestionStyle}
										onClick={() => handleSuggestionClickFrom(place)}>
										{place.name}
									</div>
								))}
							</div>
						)}
					</div>

					<br />

					<div className='ml-[10px] text-center '>
						<label className=' font-Montserrat font-medium text-white'>
							To:{' '}
						</label>
						<input
							className='rounded-xl w-[397px]'
							type='text'
							value={toLocation}
							onChange={handleSearchTo}
							placeholder='Enter a destination'
						/>
						{searchQueryTo.trim() !== '' && (
							<div className='place-suggestions font-Montserrat font-normal text-white bg-[#160E3D] rounded-xl text-left max-h-[500px] overflow-auto'>
								{filteredPlacesTo.map((place, index) => (
									<div
										className='font-medium p-[5px] ml-[5px]'
										key={index}
										style={suggestionStyle}
										onClick={() => handleSuggestionClickTo(place)}>
										{place.name}
									</div>
								))}
							</div>
						)}
					</div>
				</div>{' '}
				<br />
				<div className='find-route-routes bg-[#160E3D] rounded-xl max-w-[600px] p-[5px]'>
					{intersectionPoints &&
						intersectionPoints.map((intersection, index) => (
							<div
								key={index}
								className='text-white p-[5px]'>
								<input
									type='radio'
									id={`intersection-${index}`}
									checked={
										selectedIntersection &&
										selectedIntersection.routeFrom === intersection.routeFrom &&
										selectedIntersection.routeTo === intersection.routeTo
									}
									onChange={() => handleRadioChange(intersection)}
								/>
								<label
									className='ml-[5px]'
									htmlFor={`intersection-${index}`}>
									{`${intersection.routeFrom} to ${intersection.routeTo}`}
								</label>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default FindRoute;
