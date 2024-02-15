import React from 'react';

const RouteDropdown = ({ routes, selectedRoute, onSelectRoute }) => {
  return (
    <div  className='font-Montserrat px-[5px] py-[3px]'>
      <label className='font-extrabold text-[75px] 
                        p-[10px] text-white drop-shadow-xl'>
        Select a Jeepney Route 
      </label> <br/>
      <select value={selectedRoute} onChange={(e) => onSelectRoute(e.target.value)} className=" text-black text-[20px] w-[50%] rounded-[20px] p-[7px] border-[3px] border-black drop-shadow-xl">
        {selectedRoute ? null : <option value="" className='font-medium text-[20px] bg-[#160E3D]
                                                             text-white rounded-[10px] p-[5px]'>
                                  Select a route
                                </option>}
        {routes.map((route, index) => (
          <option key={index} value={index} className='font-regular text-[20px] bg-[#160E3D] text-white'>
            {route.title}
          </option>
        ))}
      </select>
    </div>
  );
};
export default RouteDropdown;
