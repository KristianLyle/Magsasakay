import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Map from "./Map";
import RoutesData from "./Routes.json";
import FindRoute from "./FindRoute";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const FindRouteWithMap = () => {
  const [selectedRoutes, setSelectedRoute] = useState([]);
  const [intersectionPoints, setIntersectionPoints] = useState(null); // State to hold intersection points
  const [defaultLocation, setDefaultLocation] = useState("");
  const [tileLayerUrl, setTileLayerUrl] = useState('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'); // Default TileLayer URL

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const restaurantName = searchParams.get("restaurant");
    setDefaultLocation(restaurantName || null);
  }, [location.search]);

  const handleRouteSelect = (selectedRoute) => {
    setSelectedRoute(selectedRoute);
  };

  const handleIntersectionChange = (points) => {
    console.log("Intersection Points:", points);
    setIntersectionPoints(points);
  };

  const handleTileLayerChange = (event) => {
    setTileLayerUrl(event.target.value);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div className="relative h-screen w-screen">
        <div className="absolute inset-0 z-0">
          <Map
            routesData={RoutesData}
            selectedRoutes={selectedRoutes}
            intersectionPoints={intersectionPoints} // Pass intersection points as prop
            tileLayerUrl={tileLayerUrl} // Pass the selected TileLayer URL
          />
        </div>

        <div className="absolute top-4 left-4 bg-opacity-90 p-4 rounded shadow-lg z-10 w-[25%]">
          <FindRoute
            onIntersectionChange={handleIntersectionChange}
            defaultLocation={defaultLocation}
          />
        </div>

        <div className="absolute bottom-20 left-4 bg-[#461E96] bg-opacity-90 p-4 rounded-xl shadow-lg z-10 text-white"> 
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="tileLayer"
                value="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                checked={tileLayerUrl === 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
                onChange={handleTileLayerChange}
              />
              Light
            </label>
            <label>
              <input
                type="radio"
                name="tileLayer"
                value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                checked={tileLayerUrl === 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'}
                onChange={handleTileLayerChange}
              />
              Standard
            </label>
            <label>
              <input
                type="radio"
                name="tileLayer"
                value="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
                checked={tileLayerUrl === 'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
                onChange={handleTileLayerChange}
              />
              Detailed
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindRouteWithMap;
