import routesData from './Routes.json';

// Function to calculate the distance between two coordinates using the Pythagorean theorem
function calculateDistance(coord1, coord2) {
	const dx = coord1[0] - coord2[0];
	const dy = coord1[1] - coord2[1];
	return Math.sqrt(dx * dx + dy * dy);
}

function findNearestRoute(placeCoordinates) {
	// Minimum nearest distance threshold
	const minNearestDistance = 0.001;

	// Initialize variables to hold the nearest routes and their distances
	let nearestRoutes = [];
	let nearestDistance = Infinity;

	// Iterate through each route and calculate nearest routes
	routesData.forEach((route, index) => {
		// Initialize variables to hold the nearest route for the current iteration and its distance
		let nearestRoute = null;
		let nearestRouteDistance = Infinity;

		// Iterate through each coordinate in the route
		route.coordinates.forEach((coordinate) => {
			const distance = calculateDistance(placeCoordinates, coordinate);
			if (distance < nearestRouteDistance) {
				nearestRouteDistance = distance;
				nearestRoute = route;
			}
		});

		// If the nearest distance for this route is less than or equal to the minimum nearest distance threshold, add it to the nearestRoutes array
		if (nearestRouteDistance <= minNearestDistance) {
			nearestRoutes.push({
				name: nearestRoute.name,
				description: nearestRoute.description,
				coordinates: nearestRoute.coordinates,
				color: nearestRoute.color,
				distance: nearestRouteDistance,
			});
		}

		// Update the overall nearest distance
		nearestDistance = Math.min(nearestDistance, nearestRouteDistance);
	});

	// Check if nearest routes were found
	if (nearestRoutes.length === 0) {
		console.log('No routes found near the place.');
	}

	return nearestRoutes;
}

export default findNearestRoute;
