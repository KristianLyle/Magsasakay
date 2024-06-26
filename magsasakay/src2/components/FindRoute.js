import React, { useState } from 'react';
import placesData from '../json/Places.json';
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

	const handleSearchFrom = (event) => {
		const query = event.target.value;
		setFromLocation(query);
		handleSearch(query, setFilteredPlacesFrom, setSearchQueryFrom);
	};

	const handleSearchTo = (event) => {
		const query = event.target.value;
		setToLocation(query);
		handleSearch(query, setFilteredPlacesTo, setSearchQueryTo);
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

	const [selectedIntersections, setSelectedIntersections] = useState([]);

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
	const handleCheckboxChange = (intersection) => {
		const isChecked = selectedIntersections.some(
			(item) =>
				item.routeFrom === intersection.routeFrom &&
				item.routeTo === intersection.routeTo
		);
		if (isChecked) {
			setSelectedIntersections(
				selectedIntersections.filter(
					(item) =>
						item.routeFrom !== intersection.routeFrom ||
						item.routeTo !== intersection.routeTo
				)
			);
		} else {
			setSelectedIntersections([...selectedIntersections, intersection]);
			console.log(intersection); // Log the intersection object
		}
	};

	return (
		<div className='find-route-container'>
			<div className='find-route-title'>
				<h1>Find Route</h1>
				<div className='find-route-forms'>
					<label>From: </label>
					<input
						type='text'
						value={fromLocation}
						onChange={handleSearchFrom}
					/>
					{searchQueryFrom.trim() !== '' && (
						<div className='place-suggestions'>
							{filteredPlacesFrom.map((place, index) => (
								<div
									key={index}
									style={suggestionStyle}
									onClick={() => handleSuggestionClickFrom(place)}>
									{place.name}
								</div>
							))}
						</div>
					)}
					<label>To: </label>
					<input
						type='text'
						value={toLocation}
						onChange={handleSearchTo}
					/>
					{searchQueryTo.trim() !== '' && (
						<div className='place-suggestions'>
							{filteredPlacesTo.map((place, index) => (
								<div
									key={index}
									style={suggestionStyle}
									onClick={() => handleSuggestionClickTo(place)}>
									{place.name}
								</div>
							))}
						</div>
					)}
				</div>
				<div className='find-route-routes'>
					{intersectionPoints &&
						intersectionPoints.map((intersection, index) => (
							<div key={index}>
								<input
									type='checkbox'
									id={`intersection-${index}`}
									checked={selectedIntersections.some(
										(item) =>
											item.routeFrom === intersection.routeFrom &&
											item.routeTo === intersection.routeTo
									)}
									onChange={() => handleCheckboxChange(intersection)} // Pass the intersection object to handleCheckboxChange
								/>
								<label htmlFor={`intersection-${index}`}>
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
