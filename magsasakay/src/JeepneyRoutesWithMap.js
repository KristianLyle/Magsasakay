import React, { useState } from 'react';
import Map from './Map';
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
            <div className='App'>
                <div className='app-body flex'>
                    <div className="jeepney-routes-container w-1/4 bg-blue-600 border-r-2 border-blue-900">
                        <JeepneyRoutes
                            routesData={RoutesData}
                            onRouteSelect={handleRouteSelect}
                        />
                    </div>
                    <Map
                        routesData={RoutesData}
                        selectedRoutes={selectedRoutes}
                        onIntersectionChange={handleIntersectionChange}
                        className="flex-grow"
                    />
                </div>
            </div>
        </>
    );
};

export default JeepneyRoutesWithMap;
