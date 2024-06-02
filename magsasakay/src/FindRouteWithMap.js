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
      <div className="relative h-screen w-screen bg-blue">
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

        <div className="absolute bottom-[90px] md:bottom-[90px] left-16 md:left-14 bg-[#461E96] min-w-[30%] md:min-w-[20%] max-w-[57%]
         md:max-w-[10%] w-[55%] md:w-[20%] h-[5%] md:h-[7%]
         bg-opacity-90 p-2 md:p-4 rounded-xl shadow-lg z-10 text-white mt-[20%]"> 
          <div className="flex space-x-4 text-center text-[50%] md:text-[85%]">
            <label className="custom-radio-label">
              <input
                type="radio"
                name="tileLayer"
                value="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                checked={tileLayerUrl === 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
                onChange={handleTileLayerChange}
                className="custom-radio"
              />
              Light
            </label>
            <label className="custom-radio-label">
              <input
                type="radio"
                name="tileLayer"
                value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                checked={tileLayerUrl === 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'}
                onChange={handleTileLayerChange}
                className="custom-radio"
              />
              Standard
            </label>
            <label className="custom-radio-label">
              <input
                type="radio"
                name="tileLayer"
                value="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
                checked={tileLayerUrl === 'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
                onChange={handleTileLayerChange}
                className="custom-radio"
              />
              Detailed
            </label>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-radio-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .custom-radio {
          width: 15px; /* Adjust the size of the radio button */
          height: 15px; /* Adjust the size of the radio button */
          color: #f4b55e; /* Change the color of the radio button */
          margin-right: 5px;
        }
      `}</style>
    </>
  );
};

export default FindRouteWithMap;
