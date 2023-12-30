import React, { useState, useEffect } from "react";
import RouteDropdown from "./RouteDropdown";
import MapComponent from "./Map";
import routeInfo from "./RouteInfo.json";
import v_bg from "./img/v-bg.mp4";
import viewRoute_req from "./img/viewRoute_req.png";
import { jwtDecode } from "jwt-decode";

const Location = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Fetch selected restaurant data based on some local variable
    // For now, let's assume it's stored in localStorage as selectedRestaurantId
    const selectedRestaurantId = localStorage.getItem("selectedRestaurantId");

    // Find the selected restaurant in the restaurant data
    const restaurant = routeInfo
      .flatMap((route) => route.establishments)
      .find((est) => est.name === selectedRestaurantId);

    setSelectedRestaurant(restaurant);
  }, []);

  useEffect(() => {
    // Update selectedRoute based on selectedRestaurant
    const route = routeInfo.find((route) =>
      route.establishments.some((est) => est.name === selectedRestaurant?.name)
    );

    setSelectedRoute(route);
  }, [selectedRestaurant]);

  // Decode the token to get user information
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const selectedColor = decodedToken.color;

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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: selectedColor,
            zIndex: 1,
            opacity: 0.4,
          }}
        ></div>
        <div className="absolute w-full h-full bg-gradient-to-t from-indigo-500 to-orange-500 opacity-60"></div>
      </div>
      <div className="relative p-6 text-white text-center items-center ml-[30px]">
        <RouteDropdown
          routes={routeInfo.filter((route) =>
            route.establishments.some(
              (est) => est.name === selectedRestaurant?.name
            )
          )}
          selectedRoute={selectedRoute ? routeInfo.indexOf(selectedRoute) : ""}
          onSelectRoute={handleRouteSelect}
        />
        <br />
        <MapComponent
          selectedRoute={selectedRoute}
          selectedRestaurant={selectedRestaurant}
        />
        <img
          src={viewRoute_req}
          alt="client request on view route page"
          width="350px"
          className="mt-[-725px]"
        />
      </div>
    </div>
  );

  function handleRouteSelect(routeIndex) {
    setSelectedRoute(routeInfo[routeIndex]);
  }
};

export default Location;
