import React, { useState } from 'react';
import RouteDropdown from './RouteDropdown';
import MapComponent from './Map';
import routeInfo from './RouteInfo.json';
import v_bg from './img/v-bg.mp4';
import viewRoute_req from './img/viewRoute_req.png';
import { jwtDecode } from "jwt-decode";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const RouteFinder = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteSelect = (routeIndex) => {
    setSelectedRoute(routeInfo[routeIndex]);
  };
  // Decode the token to get user information
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const selectedColor = decodedToken.color;
  const backgroundOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: selectedColor,
    zIndex: 1,
    opacity: 0.4,
  };

  return (
    <>
    <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
    <div className="min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 flex -z-50">
        <video
          src={v_bg}
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        />
        <div style={backgroundOverlay}></div>
        <div className="absolute w-full h-full bg-gradient-to-t from-indigo-500 to-orange-500 opacity-60"></div>
      </div>
      <div className="relative p-6 text-white text-center items-center mt-[-10px]">
        <RouteDropdown
          routes={routeInfo}
          selectedRoute={selectedRoute ? routeInfo.indexOf(selectedRoute) : ''}
          onSelectRoute={handleRouteSelect}
        />
        <MapComponent selectedRoute={selectedRoute}/>
      </div>
    </div>
    </>
  );
};

export default RouteFinder;
