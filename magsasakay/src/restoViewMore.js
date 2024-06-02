import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewMore = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(5); // Number of restaurants per page
  const [expandedRestaurants, setExpandedRestaurants] = useState({});
  const [dropdownRatingOpen, setDropdownRatingOpen] = useState(false);
  const [dropdownAlphabeticalOpen, setDropdownAlphabeticalOpen] =
    useState(false);
  const history = useHistory();

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
          initialExpandedState[restaurant._id] = false;
        });
        setExpandedRestaurants(initialExpandedState);
      })
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  };

  const handleRatingsClick = (order) => {
    const url =
      order === "highest"
        ? "http://localhost:3001/view-more-restaurants-ratings-highest"
        : "http://localhost:3001/view-more-restaurants-ratings-lowest";
    fetchData(url);
    setDropdownRatingOpen(false);
  };

  const handleAlphabeticalClick = (order) => {
    const url =
      order === "AZ"
        ? "http://localhost:3001/view-more-restaurants-alphabetical-AZ"
        : "http://localhost:3001/view-more-restaurants-alphabetical-ZA";
    fetchData(url);
    setDropdownAlphabeticalOpen(false);
  };

  const toggleDescription = (restaurantId) => {
    setExpandedRestaurants((prevState) => ({
      ...prevState,
      [restaurantId]: !prevState[restaurantId],
    }));
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(36, 7, 80, 0.9), rgba(36, 7, 80, 0.5))`,
  };

  const handleLocationClick = (restaurantName) => {
    const encodedRestaurantName = encodeURIComponent(restaurantName);
    history.push(`/find-routes?restaurant=${encodedRestaurantName}`);
  };

  // Logic for pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdownRating = () => {
    setDropdownRatingOpen(!dropdownRatingOpen);
  };

  const toggleDropdownAlphabetical = () => {
    setDropdownAlphabeticalOpen(!dropdownAlphabeticalOpen);
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
              <div className="flex flex-wrap items-center justify-center space-x-2 pt-4">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdownRating}
                      className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full mr-[15px] font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg w-[150px] md:w-[200px] h-[40px] md:h-[60px]"
                    >
                      View by Ratings
                    </button>
                    {dropdownRatingOpen && (
                      <div className="absolute right-0 mt-2 w-[150px] md:w-[200px] bg-white rounded-md shadow-lg">
                        <button
                          onClick={() => handleRatingsClick("highest")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Highest to Lowest
                        </button>
                        <button
                          onClick={() => handleRatingsClick("lowest")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Lowest to Highest
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdownAlphabetical}
                      className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg w-[150px] md:w-[200px] h-[40px] md:h-[60px]"
                    >
                      View by Alphabetical Order
                    </button>
                    {dropdownAlphabeticalOpen && (
                      <div className="absolute right-0 mt-2 w-[150px] md:w-[200px] bg-white rounded-md shadow-lg">
                        <button
                          onClick={() => handleAlphabeticalClick("AZ")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          A - Z
                        </button>
                        <button
                          onClick={() => handleAlphabeticalClick("ZA")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Z - A
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="flex-col justify-start md:justify-center md:pl-20">
              {currentRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="flex-container py-4">
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white justify-center
                    px-3 py-3 mx-16 mt-0 rounded-2xl inline-block shadow-slate-500 border-[#577B8D] border-[2px]
                    bg-[#160E3D] bg-cover hover:border-[#57A6A1] max-w-[1200px] md:min-w-[1200px] max-h-[550px] md:min-h-[250px] text-ellipsis ..."
                  >
                    <div className="flex flex-col md:flex-row text-white">
                      <div className="w-full md:w-1/3 flex justify-center md:justify-start pb-4 md:pb-0 pt-6 pl-2">
                        <div className="w-full md:w-auto h-20 relative flex items-center justify-center pt-[15px] mt-10 mr-5 ml-5">
                          <img
                            className="object-cover rounded-2xl border-blue-950 border-[2px] bg-[2px] shadow-lg brightness-110"
                            src={restaurant.image}
                            alt={restaurant.name}
                            style={{
                              width: "300px",
                              height: "200px",
                              minWidth: "200px",
                              minHeight: "50px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 text-center pt-10 md:pt-0 md:text-left mt-4 md:mt-0 md:pl-0">
                        <div className="text-[15px] md:text-[25px] font-regular flex items-center">
                          <span>{restaurant.name}</span>
                          <div className="flex items-center ml-[-2px] md:ml-[20px] mt-2 md:mt-0 mb-4 md:mb-0">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon
                                key={i}
                                icon={
                                  i < restaurant.averageRating
                                    ? faStar
                                    : ["far", "star"]
                                }
                                className="star-icon"
                                style={{
                                  color:
                                    i < restaurant.averageRating
                                      ? "#FFD700"
                                      : "#ccc",
                                  fontSize: "20px",
                                  marginRight: "4px",
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.color =
                                    "#yourDesiredHoverColor")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.color =
                                    i < restaurant.averageRating
                                      ? "#FFD700"
                                      : "#ccc")
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <div className="box-container mt-0 md:mt-4">
                          <p
                            className="text-[11px] md:text-[15px] font-normal text-center md:text-start"
                            style={{
                              maxHeight: expandedRestaurants[restaurant._id]
                                ? "none"
                                : "4.5rem",
                              overflow: "hidden",
                            }}
                          >
                            {restaurant.description}
                          </p>
                          {restaurant.description.length > 250 && (
                            <button
                              onClick={() => toggleDescription(restaurant._id)}
                              className="underline font-Montserrat font-light text-[11px] md:text-[15px]"
                            >
                              {expandedRestaurants[restaurant._id]
                                ? "Read Less"
                                : "Read More"}
                            </button>
                          )}
                        </div>

                        <div className="flex justify-center md:justify-end mt-[8px] flex-wrap">
                          <button
                            onClick={() => handleLocationClick(restaurant.name)}
                            className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg mr-[5px] mb-2 md:mb-0 md:mr-2 whitespace-normal"
                            style={{ width: "150px" }}
                          >
                            Location
                          </button>
                          <Link
                            to={`/resto_review/${encodeURIComponent(
                              restaurant.name
                            )}`}
                            className="bg-[#EE7200] text-[10px] md:text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] text-center shadow-lg mr-[5px] mb-2 md:mb-0 md:mr-2 whitespace-normal"
                            style={{ minWidth: "150px" }}
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
            <nav className="flex justify-center mt-1">
              <ul className="pagination flex flex-row">
                {Array.from({
                  length: Math.ceil(restaurants.length / restaurantsPerPage),
                }).map((_, index) => (
                  <li key={index} className="px-2 mb-[15px]">
                    <a
                      onClick={() => paginate(index + 1)}
                      href="#"
                      className={`font-Montserrat font-extrabold px-4 py-2 rounded-full hover:bg-[#160E3D] hover:text-white ${
                        currentPage === index + 1
                          ? "bg-[#160E3D] text-white px-4 py-2 rounded-full"
                          : "bg-[#EE7200] text-[#160E3D]"
                      }`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMore;
