import React, { useState } from 'react';
import RouteDropdown from './RouteDropdown';
import MapComponent from './Map';
import routeInfo from './RouteInfo.json';

const RouteFinder = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteSelect = (routeIndex) => {
    setSelectedRoute(routeInfo[routeIndex]);
  };

  return (
    <div>
      <h2>Find a Route</h2>
      <RouteDropdown
        routes={routeInfo}
        selectedRoute={selectedRoute ? routeInfo.indexOf(selectedRoute) : ''}
        onSelectRoute={handleRouteSelect}
      />
      <MapComponent selectedRoute={selectedRoute} />
    </div>
  );
};

export default RouteFinder;
