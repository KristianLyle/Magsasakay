import React, { useState } from 'react';
import Map from './Map';
import '../css/App.css';
import RoutesData from '../json/Routes.json';
import PlacesData from '../json/Places.json';
import JeepneyRoutes from './JeepneyRoutes';
import Destination from './Destination';
import FindRoute from './FindRoute';

const App = () => {
	const [selectedRoutes, setSelectedRoute] = useState([]);
	const [intersectionPoints, setIntersectionPoints] = useState(null); // State to hold intersection points

	const handleRouteSelect = (selectedRoute) => {
		setSelectedRoute(selectedRoute);
	};

	const handleIntersectionPoints = (points) => {
		setIntersectionPoints(points);
	};

	return (
		<div className='App'>
			<FindRoute onIntersectionPointsChange={handleIntersectionPoints} />
			<div className='app-body'>
				<JeepneyRoutes
					routesData={RoutesData}
					onRouteSelect={handleRouteSelect}
				/>
				<Destination routesData={PlacesData} />
				<Map
					routesData={RoutesData}
					selectedRoutes={selectedRoutes}
					intersectionPoints={intersectionPoints} // Pass intersection points as prop
				/>
			</div>
		</div>
	);
};

export default App;
