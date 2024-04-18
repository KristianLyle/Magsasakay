import React, { useState, useEffect } from 'react';
import '../css/JeepneyRoutes.css';

const JeepneyRoutes = ({ routesData, onRouteSelect }) => {
	const [selectedRoutes, setSelectedRoutes] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const handleRouteToggle = (index) => {
		setSelectedRoutes((prevSelectedRoutes) => {
			const isSelected = prevSelectedRoutes.includes(index);

			if (isSelected) {
				const updatedRoutes = prevSelectedRoutes.filter(
					(routeIndex) => routeIndex !== index
				);
				return updatedRoutes;
			} else {
				const allSelected = routesData.every((_, i) =>
					prevSelectedRoutes.includes(i)
				);

				if (allSelected) {
					setSelectAll(false);
				}

				return [...prevSelectedRoutes, index];
			}
		});
	};

	const handleSelectAllToggle = () => {
		setSelectAll((prevSelectAll) => !prevSelectAll);

		if (!selectAll) {
			// If "Select All" is checked, select all routes
			const allRouteIndices = routesData.map((_, index) => index);
			setSelectedRoutes(allRouteIndices);
		} else {
			// If "Select All" is unchecked, unselect all routes
			setSelectedRoutes([]);
		}
	};

	useEffect(() => {
		// Update "Select All" checkbox state based on selectedRoutes
		setSelectAll(selectedRoutes.length === routesData.length);

		onRouteSelect(selectedRoutes);
	}, [selectedRoutes, routesData, onRouteSelect]);

	return (
		<div className='jeepney-routes-container'>
			<div className='jeepney-routes-title'>
				<h3>Jeepney Routes in Iloilo</h3>
			</div>
			<div className='jeepney-routes-contents'>
				<div className='jeepney-routes-input'>
					<input
						type='checkbox'
						id='selectAllCheckbox'
						checked={selectAll}
						onChange={handleSelectAllToggle}
					/>
					<label htmlFor='selectAllCheckbox'>Select All</label>
				</div>
				<div className='horizontal-divider'></div>
				{routesData.map((route, index) => (
					<div key={index}>
						<div
							key={index}
							className='jeepney-routes-input'>
							<input
								type='checkbox'
								id={`routeCheckbox${index}`}
								checked={selectedRoutes.includes(index)}
								onChange={() => handleRouteToggle(index)}
							/>
							<label htmlFor={`routeCheckbox${index}`}>{route.name}</label>
						</div>
						<div className='horizontal-divider'></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default JeepneyRoutes;
