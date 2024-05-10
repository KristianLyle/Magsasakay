import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ViewMore = () => {
  const [restaurants, setRestaurants] = useState([]);
  const history = useHistory();
  const [expandedRestaurants, setExpandedRestaurants] = useState({});

  useEffect(() => {
    const status = window.localStorage.getItem("loggedIn");
    if (status === "false") {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  useEffect(() => {
    fetchData("http://localhost:3001/view-more-restaurants");
  }, []);

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        const initialExpandedState = {};
        data.forEach((restaurant) => {
          initialExpandedState[restaurant.id] = false;
        });
        setExpandedRestaurants(initialExpandedState);
      })
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  };

  const handleRatingsClick = () => {
    fetchData("http://localhost:3001/view-more-restaurants-ratings");
  };

  const handleAlphabeticalClick = () => {
    fetchData("http://localhost:3001/view-more-restaurants-alphabetical");
  };

  const toggleDescription = (restaurantId) => {
    setExpandedRestaurants((prevState) => ({
      ...prevState,
      [restaurantId]: !prevState[restaurantId],
    }));
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(123, 0, 255, 0.7), rgba(240, 143, 90, 0.7))`,
  };

  const handleLocationClick = (restaurantName) => {
    console.log("Location clicked:", restaurantName);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div style={backgroundStyle} className="bg-full">
        <div className="mx-auto min-h-screen flex flex-col overflow-y-auto overflow-x-auto bg-no-repeat">
          <div className="">
            <br />
            <div className=" ml-[60px] mr-[50px]">
              <h1
                className="text-white font-Montserrat mt-4 text-center font-extrabold text-[30px] md:text-[40px]"
                style={{ margin: 0 }}
              >
                More Restaurants
              </h1>
              <button
                onClick={handleRatingsClick}
                className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg ml-4 mb-4 whitespace-normal"
                style={{ width: "200px" }}
              >
                View by Ratings
              </button>
              <button
                onClick={handleAlphabeticalClick}
                className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg ml-4 mb-4 whitespace-normal"
                style={{ width: "200px" }}
              >
                View by Alphabetical Order
              </button>
            </div>
            <br />
            <div className="flex-col">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex-container pb-4 ">
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white 
                    px-3 py-3 mx-16 mt-0 rounded-2xl inline-block shadow-slate-500 border-gray-200 border-[2px] 
                    bg-[#FFF1F1] bg-cover hover:border-[#5AF0D5] max-w-none max-h-[550px] text-ellipsis ..."
                  >
                    <div className="flex flex-col md:flex-row text-black">
                      <div className="w-full md:w-1/3 flex justify-center md:justify-start pb-4 md:pb-0">
                        <div className="w-full md:w-auto h-20 relative flex items-center justify-center pt-[15px] mt-10 mr-5 ml-5">
                          <img
                            className="object-cover rounded-2xl border-blue-950 border-[2px] bg-[2px] shadow-lg brightness-110"
                            src={restaurant.image}
                            alt={restaurant.name}
                            style={{
                              width: "200px",
                              height: "150px",
                              minWidth: "200px",
                              minHeight: "150px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:text-left mt-4 md:mt-0 md:pl-0">
                        <span className="text-[15px] md:text-[25px] font-regular md:inline-block">
                          {restaurant.name}
                        </span>

                        <div className="box-container mt-0 md:mt-4">
                          <p
                            className="text-[11px] md:text-[15px] font-normal text-center md:text-left"
                            style={{
                              maxHeight: expandedRestaurants[restaurant.id]
                                ? "none"
                                : "4.5rem",
                              overflow: "hidden",
                            }}
                          >
                            {restaurant.description}
                          </p>
                          {restaurant.description.length > 250 && (
                            <button
                              onClick={() => toggleDescription(restaurant.id)}
                              className="underline font-Montserrat font-light text-[11px] md:text-[15px]"
                            >
                              {expandedRestaurants[restaurant.id]
                                ? "Read Less"
                                : "Read More"}
                            </button>
                          )}
                        </div>

                        <div className="flex justify-center md:justify-end mt-[8px] flex-wrap">
                          <button
                            onClick={() => handleLocationClick(restaurant.name)}
                            className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg mr-[5px] mb-2 md:mb-0 md:mr-2 whitespace-normal"
                            style={{ width: "150px" }} // Set specific width here
                          >
                            Location
                          </button>
                          <Link
                            to={`/resto_review/${encodeURIComponent(
                              restaurant.name
                            )}`}
                            className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg mr-[5px] mb-2 md:mb-0 md:mr-2 whitespace-normal"
                            style={{ minWidth: "150px" }} // Set specific width here
                          >
                            View Reviews
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br /> <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMore;
