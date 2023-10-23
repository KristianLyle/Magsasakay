import React, { useState } from 'react';
import RouteDropdown from './RouteDropdown';
import MapComponent from './Map';
import routeInfo from './RouteInfo.json';
import v_bg from './img/v-bg.mp4';

const RouteFinder = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteSelect = (routeIndex) => {
    setSelectedRoute(routeInfo[routeIndex]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 flex">
        <video
          src={v_bg}
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-indigo-500 to-orange-500 opacity-60"></div>
      </div>
      <div className="relative p-6 text-white text-center items-center ml-[30px]">
        <RouteDropdown
          routes={routeInfo}
          selectedRoute={selectedRoute ? routeInfo.indexOf(selectedRoute) : ''}
          onSelectRoute={handleRouteSelect}
        />
        <br/>
        <MapComponent selectedRoute={selectedRoute} />
      </div>
    </div>
  );
};

export default RouteFinder;
