import routesData from './Routes.json';

// Function to calculate the distance between two coordinates using the Pythagorean theorem
function calculateDistance(coord1, coord2) {
	const dx = coord1[0] - coord2[0];
	const dy = coord1[1] - coord2[1];
	return Math.sqrt(dx * dx + dy * dy);
}

function findNearestRoute(placeCoordinates) {
	let nearestRoutes = [];
	let nearestDistance = Infinity;
	let minNearestDistance = 0.001;

	while (nearestRoutes.length === 0 && minNearestDistance <= 0.01) {
		nearestRoutes = [];

		// eslint-disable-next-line no-loop-func
		routesData.forEach((route) => {
			let nearestRoute = null;
			let nearestRouteDistance = Infinity;

			route.coordinates.forEach((coordinate) => {
				const distance = calculateDistance(placeCoordinates, coordinate);
				if (distance < nearestRouteDistance) {
					nearestRouteDistance = distance;
					nearestRoute = route;
				}
			});

			if (nearestRouteDistance <= minNearestDistance) {
				nearestRoutes.push({
					name: nearestRoute.name,
					description: nearestRoute.description,
					coordinates: nearestRoute.coordinates,
					color: nearestRoute.color,
					distance: nearestRouteDistance,
				});
			}

			nearestDistance = Math.min(nearestDistance, nearestRouteDistance);
		});

		if (nearestRoutes.length === 0) {
			console.log(`No routes found within a distance of ${minNearestDistance}`);
			minNearestDistance *= 2;
		}
	}

	if (nearestRoutes.length === 0) {
		console.log('No routes found near the place.');
	}

	return nearestRoutes;
}

export default findNearestRoute;
