import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { decodePolyline } from "./PolylineDecoder";
import logo from "./marker.png";

const MapComponent = ({
  selectedRouteCoordinates,
  startingPointJeepneyRouteTitle,
  destinationJeepneyRouteTitle,
  startingPointDetails,
  destinationDetails,
}) => {
  const [route, setRoute] = useState(null);
  const [decodedGeometry, setDecodedGeometry] = useState([]);

  useEffect(() => {
    if (selectedRouteCoordinates) {
      const osrmCoordinates = selectedRouteCoordinates
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
  }, [selectedRouteCoordinates]);

  // Create markers for starting point and destination
  const startingPointMarker = startingPointDetails && (
    <Marker
      position={[startingPointDetails.lat, startingPointDetails.lon]}
      icon={L.icon({ iconUrl: logo, iconSize: [32, 32] })}
    >
      <Popup>
        <div>
          <h3>Starting Point</h3>
          <p>{startingPointDetails.name}</p>
          <p>Type: {startingPointDetails.type}</p>
        </div>
      </Popup>
    </Marker>
  );

  const destinationMarker = destinationDetails && (
    <Marker
      position={[destinationDetails.lat, destinationDetails.lon]}
      icon={L.icon({ iconUrl: logo, iconSize: [32, 32] })}
    >
      <Popup>
        <div>
          <h3>Destination</h3>
          <p>{destinationDetails.name}</p>
          <p>Type: {destinationDetails.type}</p>
        </div>
      </Popup>
    </Marker>
  );

  return (
    <div>
      <MapContainer
        center={[10.7202, 122.5621]}
        zoom={13}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {route && (
          <>
            <Polyline
              positions={decodedGeometry}
              color="blue"
              weight={5}
              opacity={0.7}
            >
              <Popup>
                <div>
                  <h3>Selected Route</h3>
                  <p>
                    This is the route from the starting point to the
                    destination.
                  </p>
                  {startingPointJeepneyRouteTitle && (
                    <p>
                      Starting Point Jeepney Route:{" "}
                      {startingPointJeepneyRouteTitle}
                    </p>
                  )}
                  {destinationJeepneyRouteTitle && (
                    <p>
                      Destination Jeepney Route: {destinationJeepneyRouteTitle}
                    </p>
                  )}
                </div>
              </Popup>
            </Polyline>

            {startingPointMarker}
            {destinationMarker}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
