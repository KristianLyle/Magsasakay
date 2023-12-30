import React from "react";

const RouteDropdown = ({ routes, selectedRoute, onSelectRoute }) => {
  return (
    <div className="ml-[99px] font-Montserrat px-[5px] py-[3px]">
      <label className="ml-[-125px] font-extrabold text-[75px] p-[10px] text-white drop-shadow-xl">
        PUV Routes along Restaurant
      </label>
      <select
        value={selectedRoute ? routes.indexOf(selectedRoute) : ""}
        onChange={(e) => onSelectRoute(routes[e.target.value])}
        className="text-black text-[20px] ml-[-135px] w-[50%] rounded-[20px] p-[7px] border-[3px] border-black drop-shadow-xl"
      >
        {selectedRoute ? null : (
          <option
            value=""
            className="font-medium text-[20px] bg-[#160E3D] text-white rounded-[10px] p-[5px]"
          >
            Select a route
          </option>
        )}
        {routes.map((route, index) => (
          <option
            key={index}
            value={index}
            className="font-regular text-[20px] bg-[#160E3D] text-white"
          >
            {route.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RouteDropdown;
