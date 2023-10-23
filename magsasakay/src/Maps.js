import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { decodePolyline } from './PolylineDecoder';
import routeInfo from './RouteInfo.json';
import RouteDropdown from './RouteDropdown';
import L from 'leaflet';
import logo from './marker.png';
import v_bg from './img/v-bg.mp4';

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
    <>
    <div className="relative h-screen">
      <video src={v_bg} autoPlay loop muted className='absolute w-full h-full object-cover z-0' />
      <div className="absolute w-full h-full bg-gradient-to-t from-indigo-500 to-orange-500 z-5 opacity-60"></div>
      <div className="relative z-10">
        <div className='text-center ml-[30px]'>
          <RouteDropdown
            routes={routes}
            selectedRoute={selectedRouteIndex}
            onSelectRoute={setSelectedRouteIndex}
          /> <br/>
        </div>
        <div className='items-center'>
          <MapContainer center={[10.7202, 122.5621]} zoom={13} 
            className='rounded-[30px] h-[450px] w-[700px] ml-[415px] shadow-lg shadow-black-500/40
                      border-[5px] border-[#160E3D]'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route && (
              <div className="items-center">
                <Polyline positions={decodedGeometry} color="blue" weight={5} opacity={0.7}>
                  <Popup>
                    <div className="items">
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
    </div>
    </>
  );
};

export default MapComponent;