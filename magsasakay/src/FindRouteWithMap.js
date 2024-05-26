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

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div className="App">
        <div className="app-body">
          {" "}
          <FindRoute
            onIntersectionChange={handleIntersectionChange}
            defaultLocation={defaultLocation}
          />
          <Map
            routesData={RoutesData}
            selectedRoutes={selectedRoutes}
            intersectionPoints={intersectionPoints} // Pass intersection points as prop
          />
        </div>
      </div>
    </>
  );
};

export default FindRouteWithMap;
