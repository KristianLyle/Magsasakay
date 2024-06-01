import React, { useState, useEffect } from "react";
import placesData from "./Places.json";
import NearestRouteComponent from "./NearestRoute";
import calculateIntersection from "./RouteIntersection";

const FindRoute = ({ onIntersectionChange, defaultLocation }) => {
  const [searchQueryFrom, setSearchQueryFrom] = useState("");
  const [filteredPlacesFrom, setFilteredPlacesFrom] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [nearestRoutesFrom, setNearestRoutesFrom] = useState(null);

  const [searchQueryTo, setSearchQueryTo] = useState("");
  const [filteredPlacesTo, setFilteredPlacesTo] = useState([]);
  const [toLocation, setToLocation] = useState("");
  const [toCoordinates, setToCoordinates] = useState(null);
  const [nearestRoutesTo, setNearestRoutesTo] = useState(null);

  const [selectedIntersection, setSelectedIntersection] = useState(null);

  useEffect(() => {
    if (defaultLocation) {
      setFromLocation(defaultLocation);
      setToLocation(defaultLocation);

      const defaultPlace = placesData.find(
        (place) => place.name === defaultLocation
      );
      if (defaultPlace) {
        setFromCoordinates(defaultPlace.location);
        setToCoordinates(defaultPlace.location);

        const nearestRoutes = NearestRouteComponent(defaultPlace.location);
        setNearestRoutesFrom(nearestRoutes);
        setNearestRoutesTo(nearestRoutes);
      }
    }
  }, [defaultLocation]);

  const handleSearchFrom = (event) => {
    setSearchQueryFrom(event.target.value);
    setFromLocation(event.target.value);
    setFilteredPlacesFrom([]);
    setSelectedIntersection(null); // Reset selected intersection when "From" textbox changes
    handleSearch(event.target.value, setFilteredPlacesFrom, setSearchQueryFrom);
  };

  const handleSearchTo = (event) => {
    setSearchQueryTo(event.target.value);
    setToLocation(event.target.value);
    setFilteredPlacesTo([]);
    setSelectedIntersection(null); // Reset selected intersection when "To" textbox changes
    handleSearch(event.target.value, setFilteredPlacesTo, setSearchQueryTo);
  };

  const handleSearch = (query, setFilteredPlaces, setSearchQuery) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPlaces([]);
    } else {
      const startsWithNameQuery = [];
      const containsNameQuery = [];
      const startsWithCategoryQuery = [];
      const containsCategoryQuery = [];
      const lowercaseQuery = query.toLowerCase();
      for (const place of placesData) {
        const lowercaseName = place.name.toLowerCase();
        const lowercaseCategory = place.category.toLowerCase();
        if (lowercaseName.startsWith(lowercaseQuery)) {
          startsWithNameQuery.push(place);
        } else if (lowercaseName.includes(lowercaseQuery)) {
          containsNameQuery.push(place);
        } else if (lowercaseCategory.startsWith(lowercaseQuery)) {
          startsWithCategoryQuery.push(place);
        } else if (lowercaseCategory.includes(lowercaseQuery)) {
          containsCategoryQuery.push(place);
        }
      }
      const filtered = startsWithNameQuery.concat(
        containsNameQuery,
        startsWithCategoryQuery,
        containsCategoryQuery
      );
      setFilteredPlaces(filtered);
    }
  };

  const handleSuggestionClickFrom = (place) => {
    setSearchQueryFrom(place.name);
    setFromLocation(place.name);
    setFromCoordinates(place.location); // Set the coordinates for 'from' location
    setFilteredPlacesFrom([]);
    const nearestRoutes = NearestRouteComponent(place.location);
    setNearestRoutesFrom(nearestRoutes);
  };

  const handleSuggestionClickTo = (place) => {
    setSearchQueryTo(place.name);
    setToLocation(place.name);
    setToCoordinates(place.location); // Set the coordinates for 'to' location
    setFilteredPlacesTo([]);
    const nearestRoutes = NearestRouteComponent(place.location);
    setNearestRoutesTo(nearestRoutes);
  };

  const suggestionStyle = { cursor: "pointer" };

  const handleRadioChange = (intersection) => {
    if (
      selectedIntersection &&
      selectedIntersection.routeFrom === intersection.routeFrom &&
      selectedIntersection.routeTo === intersection.routeTo
    ) {
      // If the same intersection is clicked again, deselect it
      setSelectedIntersection(null);
    } else {
      // Otherwise, select the new intersection
      setSelectedIntersection(intersection);
    }
  };

  let intersectionPoints = null;
  if (nearestRoutesFrom && nearestRoutesTo) {
    intersectionPoints = calculateIntersection(
      nearestRoutesFrom,
      nearestRoutesTo
    ).map((intersection) => ({
      ...intersection,
      fromLocation,
      toLocation,
      fromCoordinates,
      toCoordinates,
    }));
  }

  useEffect(() => {
    // Call the onIntersectionChange function with the updated selectedIntersection
    onIntersectionChange(selectedIntersection ? [selectedIntersection] : []);
  }, [selectedIntersection, onIntersectionChange]);

  return (
    <div className="find-route-container font-Montserrat bg-[#461E96]
     border-[#160E3D] border-[1.5px] rounded-xl w-[310px] md:w-[340px] h-[200px] md:h-[380px]">
      <div className="find-route-title mt-[10px] md:mt-[50px]">
        <h1 className="font-extrabold text-center text-[130%] md:text-[200%] text-white">
          Find Route
        </h1>{" "}
        <br />
        <div className="find-route-forms max-w-[50%] w-[600px] ">

          <div className=" ml-[10px] text-center ">
            <input
              className="rounded-lg w-[195%] text-[80%] md:text-[100%]"
              type="text"
              value={fromLocation}
              onChange={handleSearchFrom}
              placeholder="Enter a starting point"
            />

            {searchQueryFrom.trim() !== "" && (
              <div className="place-suggestions absolute font-Montserrat font-normal text-white text-[80%] md:text-[100%]
               bg-[#160E3D] rounded-md text-left max-h-[50%] md:max-h-[400%] max-w-[200%] md:max-w-[85%] overflow-auto overflow-x-hidden">
                {filteredPlacesFrom.map((place, index) => (
                  <div
                    className="font-medium p-[2px] md:p-[5px] ml-[5px]"
                    key={index}
                    style={suggestionStyle}
                    onClick={() => handleSuggestionClickFrom(place)}
                  >
                    {place.name}
                  </div>
                ))}
              </div>
            )}

          </div>

          <br />

          <div className="ml-[10px] text-center ">
            <input
              className="rounded-lg w-[195%] text-[80%] md:text-[100%]"
              type="text"
              value={toLocation}
              onChange={handleSearchTo}
              placeholder="Enter a destination"
            />
            {searchQueryTo.trim() !== "" && (
              <div className="place-suggestions absolute font-Montserrat font-normal text-white text-[80%] md:text-[100%]
              bg-[#160E3D] rounded-md text-left max-h-[50%] md:max-h-[400%] max-w-[200%] md:max-w-[85%] overflow-auto overflow-x-hidden">
                {filteredPlacesTo.map((place, index) => (
                  <div
                    className="font-medium p-[5px] ml-[5px]"
                    key={index}
                    style={suggestionStyle}
                    onClick={() => handleSuggestionClickTo(place)}
                  >
                    {place.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>{" "}
        <br />

        <div className="find-route-routes rounded-xl max-w-full max-h-[300px] overflow-auto overflow-x-hidden p-[5px]">
          {intersectionPoints &&
            intersectionPoints.map((intersection, index) => (
              <div className= "bg-[#160E3D]">
                <div key={index} className="text-white p-[5px] ">
                  <input
                    type="radio"
                    id={`intersection-${index}`}
                    checked={
                      selectedIntersection &&
                      selectedIntersection.routeFrom === intersection.routeFrom &&
                      selectedIntersection.routeTo === intersection.routeTo
                    }
                    onChange={() => handleRadioChange(intersection)}
                  />
                  <label className="ml-[5px]" htmlFor={`intersection-${index}`}>
                    {`${intersection.routeFrom} to ${intersection.routeTo}`}
                  </label>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default FindRoute;
