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
  const [startingPointDecodedGeometry, setStartingPointDecodedGeometry] =
    useState([]);
  const [destinationDecodedGeometry, setDestinationDecodedGeometry] = useState(
    []
  );

  useEffect(() => {
    const fetchRoute = async (coordinates, setDecodedGeometry, color) => {
      try {
        const osrmCoordinates = coordinates
          .map((coord) => `${coord.lon},${coord.lat}`)
          .join(";");

        const response = await fetch(
          `http://router.project-osrm.org/route/v1/driving/${osrmCoordinates}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const geometry = data.routes[0].geometry;
            setRoute((prevRoute) => ({
              ...prevRoute,
              [color]: geometry,
            }));

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

    if (selectedRouteCoordinates) {
      const startingPointCoordinates =
        selectedRouteCoordinates.startPointCoordinates;
      const destinationCoordinates =
        selectedRouteCoordinates.destinationCoordinates;

      fetchRoute(
        startingPointCoordinates,
        setStartingPointDecodedGeometry,
        "blue"
      );
      fetchRoute(destinationCoordinates, setDestinationDecodedGeometry, "red");
    }
  }, [selectedRouteCoordinates]);

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
    <div className="h-screen relative flex items-center mt-[-100px] justify-center">
      <MapContainer
        center={[10.7202, 122.5621]}
        zoom={13}
        style={{ height: "450px", width: "700px" }}
        className="rounded-[30px] h-[450px] w-[700px] shadow-lg shadow-black-500/40
                      border-[5px] border-[#160E3D] drop-shadow-2xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {route && route.blue && (
          <Polyline
            positions={startingPointDecodedGeometry}
            color="blue"
            weight={5}
            opacity={0.7}
          >
            <Popup>
              <div>
                <h3>Starting Point Route</h3>
                {startingPointJeepneyRouteTitle && (
                  <p>
                    Starting Point Jeepney Route:{" "}
                    {startingPointJeepneyRouteTitle}
                  </p>
                )}
              </div>
            </Popup>
          </Polyline>
        )}

        {route && route.red && (
          <Polyline
            positions={destinationDecodedGeometry}
            color="red"
            weight={5}
            opacity={0.7}
          >
            <Popup>
              <div>
                <h3>Destination Route</h3>
                {destinationJeepneyRouteTitle && (
                  <p>
                    Destination Jeepney Route: {destinationJeepneyRouteTitle}
                  </p>
                )}
              </div>
            </Popup>
          </Polyline>
        )}

        {startingPointMarker}
        {destinationMarker}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
