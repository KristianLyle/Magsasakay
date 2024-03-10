import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
  const [route, setRoute] = useState(null);
  const [decodedGeometry, setDecodedGeometry] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);

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
    <div className="h-screen relative flex items-center justify-center">
      <div className="items-center mt-[-100px]">
        <MapContainer
          center={[10.7202, 122.5621]}
          zoom={13}
          className="rounded-[30px] h-[450px] w-[700px] shadow-lg shadow-black-500/40 border-[5px]  border-[#160E3D] drop-shadow-2xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {route && (
            <div className="items-center ">
              <Polyline
                positions={decodedGeometry}
                color={selectedRoute.color}
                weight={5}
                opacity={0.7}
              >
                <Popup>
                  <div className="bg-[#EE7200] p-4">
                    <h3 className="text-white text-xl font-semibold">
                      {selectedRoute.title}
                    </h3>
                    <p className="text-white">{selectedRoute.description}</p>
                  </div>
                </Popup>
              </Polyline>
              {selectedRoute.establishments.map((establishment, index) => (
                <Marker
                  key={index}
                  position={[establishment.lat, establishment.lon]}
                  icon={customIcon}
                  eventHandlers={{
                    mouseover: () => setHoveredMarker(index),
                    mouseout: () => setHoveredMarker(null),
                    click: () => setClickedMarker(index),
                  }}
                >
                  {(hoveredMarker === index || clickedMarker === index) && (
                    <Popup onClose={() => setClickedMarker(null)}>
                      <div className="text-center bg-[#EE7200] p-4 text-white">
                        <img
                          className="popup-image w-[200px] h-[150px] object-cover mx-auto mb-4"
                          src={`${process.env.PUBLIC_URL}/${establishment.image}`}
                          alt=""
                        />
                        <h3 className="font-semibold text-xl">
                          {establishment.name}
                        </h3>
                        <p className="mt-1">Type: {establishment.type}</p>
                      </div>
                    </Popup>
                  )}
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
