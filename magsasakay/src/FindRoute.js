import React, { useState } from "react";
import MapComponent from "./MultiRoute"; // Import your MapComponent
import routeInfo from "./RouteInfo.json"; // Import your JSON data

const RouteFinder = () => {
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRouteCoordinates, setSelectedRouteCoordinates] =
    useState(null);
  const [startingPointJeepneyRouteTitle, setStartingPointJeepneyRouteTitle] =
    useState("");
  const [destinationJeepneyRouteTitle, setDestinationJeepneyRouteTitle] =
    useState("");
  const [startingPointDetails, setStartingPointDetails] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);

  // Function to find route coordinates, Jeepney route title, and route number based on the selected establishment
  const findRouteInfo = (establishmentName) => {
    for (const route of routeInfo) {
      for (const establishment of route.establishments) {
        if (establishment.name === establishmentName) {
          return {
            coordinates: route.coordinates,
            title: route.title,
            details: establishment,
            routeNo: route.routeNo,
          };
        }
      }
    }
    return null;
  };

  // Function to handle user selection of starting point
  const handleStartPointChange = (event) => {
    const selectedStartPoint = event.target.value;
    setStartPoint(selectedStartPoint);

    // Find coordinates, title, and details for the selected starting point
    const startRouteInfo = findRouteInfo(selectedStartPoint);
    if (startRouteInfo) {
      setStartingPointJeepneyRouteTitle(startRouteInfo.title);
      setStartingPointDetails(startRouteInfo.details);
    }
  };

  // Function to handle user selection of destination
  const handleDestinationChange = (event) => {
    const selectedDestination = event.target.value;
    setDestination(selectedDestination);

    // Find coordinates, title, and details for the selected destination
    const destinationRouteInfo = findRouteInfo(selectedDestination);
    if (destinationRouteInfo) {
      setDestinationJeepneyRouteTitle(destinationRouteInfo.title);
      setDestinationDetails(destinationRouteInfo.details);
    }
  };

  // Function to find and display the route based on the selected starting point and destination
  const findRoute = () => {
    // Find coordinates for the selected starting point and destination
    const startPointCoordinates = findRouteInfo(startPoint)?.coordinates;
    const destinationCoordinates = findRouteInfo(destination)?.coordinates;

    if (startPointCoordinates && destinationCoordinates) {
      // Merge the two arrays into a single array
      const mergedCoordinates = startPointCoordinates.concat(
        destinationCoordinates
      );
      setSelectedRouteCoordinates(mergedCoordinates);
    } else {
      setSelectedRouteCoordinates(null);
    }
  };

  // Function to get unique and sorted establishment names
  const getUniqueAndSortedEstablishments = () => {
    const establishments = routeInfo.reduce((acc, route) => {
      route.establishments.forEach((establishment) => {
        if (!acc.includes(establishment.name)) {
          acc.push(establishment.name);
        }
      });
      return acc;
    }, []);

    return establishments.sort();
  };

  return (
    <div>
      <h2>Find a Route</h2>
      <div>
        <label>Starting Point:</label>
        <select value={startPoint} onChange={handleStartPointChange}>
          <option value="">Select starting point</option>
          {getUniqueAndSortedEstablishments().map((establishment) => (
            <option key={establishment} value={establishment}>
              {establishment}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Destination:</label>
        <select value={destination} onChange={handleDestinationChange}>
          <option value="">Select destination</option>
          {getUniqueAndSortedEstablishments().map((establishment) => (
            <option key={establishment} value={establishment}>
              {establishment}
            </option>
          ))}
        </select>
      </div>

      <button onClick={findRoute}>Find Route</button>

      {/* Display Jeepney route titles after the button is clicked */}
      {selectedRouteCoordinates && (
        <div>
          <p>Starting Point Jeepney Route: {startingPointJeepneyRouteTitle}</p>
          <p>Destination Jeepney Route: {destinationJeepneyRouteTitle}</p>
        </div>
      )}

      <MapComponent
        selectedRouteCoordinates={selectedRouteCoordinates}
        startingPointJeepneyRouteTitle={startingPointJeepneyRouteTitle}
        destinationJeepneyRouteTitle={destinationJeepneyRouteTitle}
        startingPointDetails={startingPointDetails}
        destinationDetails={destinationDetails}
      />
    </div>
  );
};

export default RouteFinder;
