import React, { useState, useEffect } from "react";
import MapComponent from "./MultiRoute"; // Import your MapComponent
import routeInfo from "./RouteInfo.json"; // Import your JSON data
import f_bg from "./img/f_bg.mp4";
import NavBar from "./navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

const RouteFinder = () => {
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRouteCoordinates, setSelectedRouteCoordinates] =
    useState(null);
  const [startingPointJeepneyRouteTitle, setStartingPointJeepneyRouteTitle] =
    useState("");
  const [destinationJeepneyRouteTitle, setDestinationJeepneyRouteTitle] =
    useState("");
  const [startingPointDetails, setStartingPointDetails] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);

  const history = useHistory();
  useEffect(() => {
    const status = window.localStorage.getItem("loggedIn");
    if (status === "false") {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  // Function to find route coordinates, Jeepney route title, and route number based on the selected establishment
  const findRouteInfo = (establishmentName) => {
    for (const route of routeInfo) {
      for (const establishment of route.establishments) {
        if (establishment.name === establishmentName) {
          return {
            coordinates: route.coordinates,
            title: route.title,
            details: establishment,
            routeNo: route.routeNo,
          };
        }
      }
    }
    return null;
  };

  // Function to handle user selection of starting point
  const handleStartPointChange = (event) => {
    const selectedStartPoint = event.target.value;
    setStartPoint(selectedStartPoint);

    // Find coordinates, title, and details for the selected starting point
    const startRouteInfo = findRouteInfo(selectedStartPoint);
    if (startRouteInfo) {
      setStartingPointJeepneyRouteTitle(startRouteInfo.title);
      setStartingPointDetails(startRouteInfo.details);
    }
  };

  // Function to handle user selection of destination
  const handleDestinationChange = (event) => {
    const selectedDestination = event.target.value;
    setDestination(selectedDestination);

    // Find coordinates, title, and details for the selected destination
    const destinationRouteInfo = findRouteInfo(selectedDestination);
    if (destinationRouteInfo) {
      setDestinationJeepneyRouteTitle(destinationRouteInfo.title);
      setDestinationDetails(destinationRouteInfo.details);
    }
  };

  // Function to find and display the route based on the selected starting point and destination
  const findRoute = () => {
    // Find coordinates for the selected starting point and destination
    const startPointCoordinates = findRouteInfo(startPoint)?.coordinates;
    const destinationCoordinates = findRouteInfo(destination)?.coordinates;

    if (startPointCoordinates && destinationCoordinates) {
      setSelectedRouteCoordinates({
        startPointCoordinates,
        destinationCoordinates,
      });
    } else {
      setSelectedRouteCoordinates(null);
    }
  };

  // Function to get unique and sorted establishment names
  const getUniqueAndSortedEstablishments = () => {
    const establishments = routeInfo.reduce((acc, route) => {
      route.establishments.forEach((establishment) => {
        if (!acc.includes(establishment.name)) {
          acc.push(establishment.name);
        }
      });
      return acc;
    }, []);

    return establishments.sort();
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div className="items-center text-center">
        <div className="fixed inset-0 flex -z-50">
          <video
            src={f_bg}
            autoPlay
            loop
            muted
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute w-full h-full bg-gradient-to-t from-indigo-500 to-orange-500 opacity-40"></div>
        </div>
        <h2
          className="font-extrabold text-[75px] 
                        p-[10px] text-white drop-shadow-xl"
        >
          Find a Route
        </h2>
        <div className="font-Montserrat">
          <label className="text-white drop-shadow-2xl font-semibold ">
            Starting Point:{" "}
          </label>
          <select
            className="text-black w-[50%] rounded-[20px] p-[7px] border-[3px] border-black drop-shadow-xl"
            value={startPoint}
            onChange={handleStartPointChange}
          >
            <option className="text-white" value="">
              Select starting point
            </option>
            {getUniqueAndSortedEstablishments().map((establishment) => (
              <option key={establishment} value={establishment}>
                {establishment}
              </option>
            ))}
          </select>
        </div>
        <br />

        <div className="font-Montserrat ml-[-15px]">
          <label className="text-white drop-shadow-2xl font-semibold">
            Destination:{" "}
          </label>
          <select
            className="text-black w-[50%] rounded-[20px] p-[7px] border-[3px] border-black drop-shadow-xl"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">Select destination</option>
            {getUniqueAndSortedEstablishments().map((establishment) => (
              <option key={establishment} value={establishment}>
                {establishment}
              </option>
            ))}
          </select>
        </div>

        <br />

        <button
          className="z-[99] relative font-Montserrat bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] px-[25px] max-w-[200px]"
          onClick={findRoute}
        >
          Find Route
        </button>
        <br />
        <br />
        {/* Display Jeepney route titles after the button is clicked */}
        {selectedRouteCoordinates && (
          <div className="flex justify-center items-center">
            <div className="items-center font-Montserrat text-white drop-shadow-2xl  bg-[#160E3D] max-w-[1000px] rounded-xl py-[5px] px-[20px]">
              <p>Starting Point Jeepney Route:</p>{" "}
              <p className="font-semibold">
                {" "}
                {startingPointJeepneyRouteTitle}{" "}
                <span style={{ color: "blue" }}>(Blue)</span>
              </p>{" "}
              <br />
              <p>Destination Jeepney Route: </p>{" "}
              <p className="font-semibold">
                {destinationJeepneyRouteTitle}{" "}
                <span style={{ color: "red" }}>(Red)</span>
              </p>
            </div>
          </div>
        )}
        <div className="relative z-[1] p-6 text-white text-center items-center">
          <MapComponent
            selectedRouteCoordinates={selectedRouteCoordinates}
            startingPointJeepneyRouteTitle={startingPointJeepneyRouteTitle}
            destinationJeepneyRouteTitle={destinationJeepneyRouteTitle}
            startingPointDetails={startingPointDetails}
            destinationDetails={destinationDetails}
          />
        </div>
      </div>
    </>
  );
};

export default RouteFinder;
