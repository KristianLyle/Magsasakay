import React, { useState } from 'react';
import Map from './ViewRouteMap';
import RoutesData from './Routes.json';
import JeepneyRoutes from './JeepneyRoutes';
import NavBar from './navbar';

const JeepneyRoutesWithMap = () => {
    const [selectedRoutes, setSelectedRoute] = useState([]);
    const [intersectionPoints, setIntersectionPoints] = useState(null); // State to hold intersection points

    const handleRouteSelect = (selectedRoute) => {
        setSelectedRoute(selectedRoute);
    };

    const handleIntersectionChange = (points) => {
        console.log('Intersection Points:', points);
        setIntersectionPoints(points);
    };

    return (
        <>
            <NavBar />
            <div className="App relative">
                <div className="app-body flex overflow-hidden pt-[0px]">
                    <div className="jeepney-routes-container w-1/4 bg-blue-600 border-r-2 border-blue-900 relative z-20">
                        <JeepneyRoutes
                            routesData={RoutesData}
                            onRouteSelect={handleRouteSelect}
                        />
                    </div>
                    <div className="flex-grow relative z-10">
                        <Map
                            routesData={RoutesData}
                            selectedRoutes={selectedRoutes}
                            onIntersectionChange={handleIntersectionChange}
                            className="overflow-hidden h-full"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default JeepneyRoutesWithMap;
