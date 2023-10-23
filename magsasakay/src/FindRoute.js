import React, { useState } from 'react';
import MapComponent from './Map'; // Import your MapComponent
import routeInfo from './RouteInfo.json'; // Import your JSON data

const RouteFinder = () => {
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRouteCoordinates, setSelectedRouteCoordinates] = useState(null);

  // Function to find route coordinates based on the selected establishment
  const findRouteCoordinates = (establishmentName) => {
    for (const route of routeInfo) {
      for (const establishment of route.establishments) {
        if (establishment.name === establishmentName) {
          return route.coordinates;
        }
      }
    }
    return null;
  };

  // Function to handle user selection of starting point
  const handleStartPointChange = (event) => {
    setStartPoint(event.target.value);
  };

  // Function to handle user selection of destination
  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  // Function to find and display the route based on the selected starting point and destination
  const findRoute = () => {
    console.log('Starting Point:', startPoint);
    console.log('Destination:', destination);

    // Find coordinates for the selected starting point and destination
    const startPointCoordinates = findRouteCoordinates(startPoint);
    const destinationCoordinates = findRouteCoordinates(destination);

    if (startPointCoordinates && destinationCoordinates) {
      console.log('Starting Point Coordinates:', startPointCoordinates);
      console.log('Destination Coordinates:', destinationCoordinates);
      setSelectedRouteCoordinates([startPointCoordinates, destinationCoordinates]);
    } else {
      setSelectedRouteCoordinates(null);
    }
  };

  return (
    <div>
      <h2>Find a Route</h2>
      <div>
        <label>Starting Point:</label>
        <select value={startPoint} onChange={handleStartPointChange}>
          <option value="">Select starting point</option>
          {routeInfo.map((route) =>
            route.establishments.map((establishment) => (
              <option key={establishment.name} value={establishment.name}>
                {establishment.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label>Destination:</label>
        <select value={destination} onChange={handleDestinationChange}>
          <option value="">Select destination</option>
          {routeInfo.map((route) =>
            route.establishments.map((establishment) => (
              <option key={establishment.name} value={establishment.name}>
                {establishment.name}
              </option>
            ))
          )}
        </select>
      </div>

      <button onClick={findRoute}>Find Route</button>

      {selectedRouteCoordinates && (
        <div>
          <h3>Selected Route Coordinates</h3>
          {selectedRouteCoordinates.map((coord, index) => (
            <p key={index}>Lat: {coord.lat}, Lon: {coord.lon}</p>
          ))}
        </div>
      )}
      <MapComponent selectedRouteCoordinates={selectedRouteCoordinates} />
    </div>
  );
};

export default RouteFinder;
