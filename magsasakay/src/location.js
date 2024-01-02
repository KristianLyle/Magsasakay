import React, { useState, useEffect } from "react";
import RouteDropdown from "./restoRouteDropdown";
import MapComponent from "./Map";
import restoRouteInfo from "./restoRoutes.json";
import l_bg from "./img/l_bg.mp4";
import viewRoute_req from "./img/viewRoute_req.png";
import { jwtDecode } from "jwt-decode";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Location = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const selectedRestaurantId = localStorage.getItem("selectedRestaurantId");

    // Find the selected restaurant in the restaurant data using case-insensitive comparison
    const restaurant = restoRouteInfo
      .flatMap((route) => route.establishments)
      .find(
        (est) =>
          est.name.trim().toLowerCase() ===
          selectedRestaurantId.trim().toLowerCase()
      );

    setSelectedRestaurant(restaurant);
  }, []);

  useEffect(() => {
    // Update selectedRoute based on selectedRestaurant
    const route = restoRouteInfo.find((r) =>
      r.establishments.some((est) => est.name === selectedRestaurant?.name)
    );

    setSelectedRoute(route);
  }, [selectedRestaurant]);

  const handleRouteSelect = (selectedRoute) => {
    // Update selectedRoute directly
    setSelectedRoute(selectedRoute);
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
          src={l_bg}
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        />
        <div style={backgroundOverlay}></div>
        <div className="absolute w-full h-full bg-gradient-to-t from-indigo-500 to-orange-500 opacity-60"></div>
      </div>
      <div className="relative p-6 text-white text-center items-center ml-[30px]">
        <RouteDropdown
          routes={restoRouteInfo.filter((r) =>
            r.establishments.some(
              (est) => est.name === selectedRestaurant?.name
            )
          )}
          selectedRoute={selectedRoute}
          onSelectRoute={handleRouteSelect}
        />
        <br />
        <MapComponent selectedRoute={selectedRoute} />
        <img
          src={viewRoute_req}
          alt="client request on view route page"
          width="350px"
          className="mt-[-725px]"
        />
      </div>
    </div>
    </>
  );
};

export default Location;
