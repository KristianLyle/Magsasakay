// Map.js
import React from 'react';
import {
	MapContainer,
	Marker,
	Polyline,
	TileLayer,
	Tooltip,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import marker from './marker-dark.png';

const Map = ({ routesData, selectedRoutes, intersectionPoints }) => {
	const customIcon = new L.icon({
		iconUrl: marker,
		iconSize: [25, 35],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
	});

	return (
		<MapContainer
			center={[10.7202, 122.5621]}
			zoom={13}
			zoomControl={false}
			maxBounds={[
				[10.6602, 122.4393],
				[10.7992, 122.6955],
			]}
			maxBoundsViscosity={1.0}>
			<TileLayer
				url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
				subdomains='abcd'
				minZoom={13}
				maxZoom={17}
			/>
			{selectedRoutes.map((index) => (
				<Polyline
					key={index}
					positions={routesData[index].coordinates}
					weight={5}
					color={routesData[index].color || '#f4b55e'}
					opacity={0.7}>
					<Tooltip
						direction='top'
						offset={[0, 0]}
						opacity={1}
						sticky>
						{routesData[index].name}
					</Tooltip>
				</Polyline>
			))}
			{intersectionPoints &&
				intersectionPoints.map((intersection, index) => (
					<React.Fragment key={index}>
						{intersection.routeFromCoordinates && (
							<Polyline
								positions={[intersection.routeFromCoordinates]}
								color={intersection.routeFromColor || 'red'}
								weight={5}
								opacity={0.7}>
								<Tooltip
									direction='top'
									offset={[0, 0]}
									opacity={1}
									sticky>
									{intersection.routeFrom}
								</Tooltip>
							</Polyline>
						)}
						{intersection.routeToCoordinates && (
							<Polyline
								positions={[intersection.routeToCoordinates]}
								color={intersection.routeToColor || 'green'}
								weight={5}
								opacity={0.7}>
								<Tooltip
									direction='top'
									offset={[0, 0]}
									opacity={1}
									sticky>
									{intersection.routeTo}
								</Tooltip>
							</Polyline>
						)}
						{intersection.intersection && (
							<Polyline
								positions={[intersection.intersection]}
								color='red'
								weight={5}
								opacity={0.7}>
								<Tooltip
									direction='top'
									offset={[0, 20]}
									opacity={1}
									sticky>
									Change jeepney here
								</Tooltip>
							</Polyline>
						)}
						{intersection.fromCoordinates && (
							<Marker
								position={intersection.fromCoordinates}
								icon={customIcon}>
								<Tooltip
									direction='top'
									offset={[0, -23]}
									opacity={1}
									permanent>
									{intersection.fromLocation}
								</Tooltip>
							</Marker>
						)}
						{intersection.toCoordinates && (
							<Marker
								position={intersection.toCoordinates}
								icon={customIcon}>
								<Tooltip
									direction='top'
									offset={[0, -23]}
									opacity={1}
									permanent>
									{intersection.toLocation}
								</Tooltip>
							</Marker>
						)}
					</React.Fragment>
				))}
		</MapContainer>
	);
};

export default Map;
