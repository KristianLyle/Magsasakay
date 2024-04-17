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
			<Polyline
				positions={[
					[10.74212, 122.53933],
					[10.74218, 122.5392],
					[10.74268, 122.53933],
					[10.74301, 122.5394],
					[10.74322, 122.53944],
					[10.74357, 122.53948],
					[10.74378, 122.5395],
					[10.74412, 122.5395],
					[10.74423, 122.53949],
					[10.74476, 122.53942],
					[10.74554, 122.53934],
					[10.74576, 122.53931],
					[10.74631, 122.53926],
					[10.74636, 122.53926],
					[10.74662, 122.53923],
					[10.74692, 122.53921],
					[10.74701, 122.5392],
					[10.74782, 122.5391],
					[10.74817, 122.53905],
					[10.74848, 122.539],
					[10.74878, 122.53896],
					[10.74896, 122.53893],
					[10.74904, 122.53892],
					[10.74907, 122.53889],
					[10.74908, 122.53888],
					[10.7491, 122.53887],
					[10.74913, 122.53886],
					[10.7495, 122.53882],
					[10.75027, 122.53868],
					[10.75029, 122.53879],
					[10.74951, 122.53893],
					[10.74915, 122.53902],
					[10.74913, 122.53903],
					[10.74911, 122.53903],
					[10.74909, 122.53902],
					[10.74905, 122.53901],
					[10.74897, 122.53902],
					[10.74879, 122.53905],
					[10.74849, 122.53909],
					[10.74819, 122.53914],
					[10.74783, 122.53919],
					[10.74755, 122.53923],
					[10.74707, 122.5393],
					[10.74663, 122.53934],
					[10.74633, 122.53937],
					[10.74557, 122.53946],
					[10.74477, 122.53955],
					[10.74464, 122.53957],
					[10.74457, 122.53958],
					[10.74427, 122.5396],
					[10.74414, 122.53961],
					[10.74394, 122.53962],
					[10.74369, 122.53962],
					[10.74353, 122.5396],
					[10.74337, 122.53959],
					[10.74316, 122.53956],
					[10.74313, 122.53955],
					[10.74299, 122.53953],
					[10.7428, 122.53949],
					[10.74262, 122.53945],
					[10.74212, 122.53933],
				]}
				weight={5}
				color={'#f4b55e'}
				opacity={0.7}>
				<Tooltip
					direction='top'
					offset={[0, 0]}
					opacity={1}
					sticky>
					{'intersection'}
				</Tooltip>
			</Polyline>

			<Marker
				position={[10.7152, 122.55177]}
				icon={customIcon}>
				<Tooltip
					direction='top'
					offset={[0, -10]}
					opacity={1}>
					SM City
				</Tooltip>
			</Marker>
		</MapContainer>
	);
};

export default Map;
