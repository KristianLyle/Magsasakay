import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { decodePolyline } from './PolylineDecoder';
import routeInfo from './RouteInfo.json';
import RouteDropdown from './RouteDropdown';
import L from 'leaflet';
import logo from './marker.png';

const customIcon = L.icon({
  iconUrl: logo,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = () => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState('');
  const routes = routeInfo;
  const selectedRoute = routes[selectedRouteIndex];
  const [route, setRoute] = useState(null);
  const [decodedGeometry, setDecodedGeometry] = useState([]);

  useEffect(() => {
    if (!selectedRoute) {
      setRoute(null);
      setDecodedGeometry([]);
      return;
    }

    const osrmCoordinates = selectedRoute.coordinates.map((coord) => `${coord.lon},${coord.lat}`).join(';');

    const fetchRoute = async () => {
      try {
        const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${osrmCoordinates}`);

        if (response.ok) {
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const geometry = data.routes[0].geometry;
            setRoute(geometry);

            const decodedCoordinates = decodePolyline(geometry);
            setDecodedGeometry(decodedCoordinates);
          }
        } else {
          console.error('Failed to fetch route data');
        }
      } catch (error) {
        console.error('Error fetching route data', error);
      }
    };

    fetchRoute();
  }, [selectedRoute]);

  return (
    <div>
      <div>
        <RouteDropdown
          routes={routes}
          selectedRoute={selectedRouteIndex}
          onSelectRoute={setSelectedRouteIndex}
        />
      </div>
      <div>
        <MapContainer center={[10.7202, 122.5621]} zoom={13} style={{ height: '500px', width: '500px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {route && (
            <div>
              <Polyline positions={decodedGeometry} color="blue" weight={5} opacity={0.7}>
                <Popup>
                  <div>
                    <h3>{selectedRoute.title}</h3>
                    <p>{selectedRoute.description}</p>
                  </div>
                </Popup>
              </Polyline>
              {selectedRoute.establishments.map((establishment, index) => (
                <Marker
                  key={index}
                  position={[establishment.lat, establishment.lon]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <h3>{establishment.name}</h3>
                      <p>Type: {establishment.type}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </div>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;