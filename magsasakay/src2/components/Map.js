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
import '../css/Map.css';
import marker from '../images/marker-dark.png';

const Map = ({ routesData, selectedRoutes }) => {
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

			{/* 
			<Marker
				position={[10.71858, 122.55262]}
				icon={customIcon}>
				<Tooltip
					direction='top'
					offset={[0, -10]}
					opacity={1}>
					SM City
				</Tooltip>
			</Marker> */}
		</MapContainer>
	);
};

export default Map;
