import React from 'react';

const RouteDropdown = ({ routes, selectedRoute, onSelectRoute }) => {
  return (
    <div className='text-center ml-[30px]'>
      <label>Select a Jeepney Route: </label>
      <select value={selectedRoute} onChange={(e) => onSelectRoute(e.target.value)}>
        {selectedRoute ? null : <option value="">Select a route</option>}
        {routes.map((route, index) => (
          <option key={index} value={index}>
            {route.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RouteDropdown;
