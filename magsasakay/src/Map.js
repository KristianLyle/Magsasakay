import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { jwtDecode } from "jwt-decode";
import { decodePolyline } from "./PolylineDecoder";
import L from "leaflet";
import logo from "./marker.png";

const customIcon = L.icon({
  iconUrl: logo,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({ selectedRoute, color }) => {
  // Decode the token to get user information
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const selectedColor = decodedToken.color;
  const [route, setRoute] = useState(null);
  const [decodedGeometry, setDecodedGeometry] = useState([]);

  useEffect(() => {
    if (selectedRoute) {
      const osrmCoordinates = selectedRoute.coordinates
        .map((coord) => `${coord.lon},${coord.lat}`)
        .join(";");

      const fetchRoute = async () => {
        try {
          const response = await fetch(
            `http://router.project-osrm.org/route/v1/driving/${osrmCoordinates}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
              const geometry = data.routes[0].geometry;
              setRoute(geometry);

              const decodedCoordinates = decodePolyline(geometry);
              setDecodedGeometry(decodedCoordinates);
            }
          } else {
            console.error("Failed to fetch route data");
          }
        } catch (error) {
          console.error("Error fetching route data", error);
        }
      };

      fetchRoute();
    }
  }, [selectedRoute]);

  return (
    <>
      <div className="relative h-screen">
        <div className="items-center ml-[355px]">
          <MapContainer
            center={[10.7202, 122.5621]}
            zoom={13}
            className="rounded-[30px] h-[450px] w-[700px] shadow-lg shadow-black-500/40
                      border-[5px] border-[#160E3D] drop-shadow-2xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route && (
              <div className="items-center">
                <Polyline
                  positions={decodedGeometry}
                  color={selectedColor}
                  weight={5}
                  opacity={0.7}
                >
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
    </>
  );
};

export default MapComponent;
