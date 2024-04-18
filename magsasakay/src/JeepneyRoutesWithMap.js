import React, { useState } from 'react';
import Map from './Map';
import RoutesData from './Routes.json';
import JeepneyRoutes from './JeepneyRoutes';

const JeepneyRoutesWithMap = () => {
	const [selectedRoutes, setSelectedRoute] = useState([]);
	const [intersectionPoints, setIntersectionPoints] = useState(null); // State to hold intersection points

	const handleRouteSelect = (selectedRoute) => {
		setSelectedRoute(selectedRoute);
	};

	const handleIntersectionChange = (points) => {
		console.log('Intersection Points:', points);
		setIntersectionPoints(points);
	};

	return (
		<div className='App'>
			<div className='app-body'>
				<JeepneyRoutes
					routesData={RoutesData}
					onRouteSelect={handleRouteSelect}
				/>
				<Map
					routesData={RoutesData}
					selectedRoutes={selectedRoutes}
					intersectionPoints={intersectionPoints} // Pass intersection points as prop
				/>
			</div>
		</div>
	);
};

export default JeepneyRoutesWithMap;
