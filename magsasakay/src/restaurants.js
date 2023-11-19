import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import resto_bg from "./img/resto_bg.jpg";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data from the API
    fetch("http://localhost:3001/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${resto_bg})`,
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div
        style={backgroundStyle}
        className="bg-cover bg-center bg-fixed min-h-screen"
      >
        <div className="mx-auto h-screen">
          <div className="">
            <br />
            <h1
              className="text-white font-Montserrat mt-4 text-center font-extrabold text-[40px]"
              style={{ margin: 0 }}
            >
              Popular Right Now
            </h1>
            <br />
            <div className="mx-auto flex justify-center space-x-35">
              {restaurants.map((restaurant, index) => (
                <div className="flex-container" key={index}>
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white 
                    px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                    bg-[#160E3D] bg-cover hover:border-[#5AF0D5] max-w-[350px] h-[500px]"
                  >
                    {/* Render restaurant details from the API */}
                    <div className="flex justify-center">
                      <img
                        className="w-80 h-60 object-cover rounded-3xl border-[2px] border-white"
                        src={restaurant.image}
                        alt={restaurant.name}
                      />
                    </div>
                    <span className="text-[20px] font-regular">
                      {restaurant.name}
                    </span>
                    <div className="box-container">
                      <p className="text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto">
                        {restaurant.description}
                      </p>
                      <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mr-[5px]">
                        Location
                      </button>
                      <Link
                        to={`/resto_review/${encodeURIComponent(
                          restaurant.name
                        )}`} // Pass the restaurant name in the URL
                        className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover-text-[#160E3D] drop-shadow-2xl"
                      >
                        View Reviews
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
            <br /> <br />
            <Link
              to="restoViewMore"
              className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                                font-bold text-white hover:bg-white hover:text-[#160E3D] 
                                drop-shadow-2xl ml-[665px] font-Montserrat px-[50px]"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
