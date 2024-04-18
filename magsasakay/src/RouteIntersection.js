import { intersect } from '@turf/turf';

function calculateIntersection(nearestRoutesFrom, nearestRoutesTo) {
	// Initialize an array to store the intersection results
	const intersections = [];

	// Calculate intersection for each pair of polygons
	nearestRoutesFrom.forEach((routeFrom) => {
		nearestRoutesTo.forEach((routeTo) => {
			// Extract polygons from nearestRoutesFrom and nearestRoutesTo
			const polygons1 = routeFrom.coordinates;
			const polygons2 = routeTo.coordinates;

			// Calculate the intersection using @turf/turf library
			const intersection = intersect(
				{
					type: 'Feature',
					geometry: { type: 'Polygon', coordinates: [polygons1] },
				},
				{
					type: 'Feature',
					geometry: { type: 'Polygon', coordinates: [polygons2] },
				}
			);

			// Check if there's actually an intersection and limit to one intersection
			if (intersection && intersection.geometry.coordinates.length > 1) {
				intersection.geometry.coordinates =
					intersection.geometry.coordinates[0];
			}

			// Check if there's actually an intersection
			if (intersection) {
				// Add intersection details to the array
				intersections.push({
					routeFrom: routeFrom.name,
					routeFromCoordinates: routeFrom.coordinates,
					routeFromColor: routeFrom.color,
					routeTo: routeTo.name,
					routeToCoordinates: routeTo.coordinates,
					routeToColor: routeTo.color,
					intersection: intersection.geometry.coordinates,
				});
			}
		});
	});

	// Return the intersection results
	return intersections.length > 0 ? intersections : null;
}

export default calculateIntersection;
