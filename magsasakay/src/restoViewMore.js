import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ViewMore = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data from the API
    fetch("http://localhost:3001/view-more-restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  }, []);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(123, 0, 255, 0.7), rgba(240, 143, 90, 0.7))`,
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
        <div className="mx-auto min-h-screen">
          <div className="">
            <br />
            <h1
              className="text-white font-Montserrat mt-4 text-center font-extrabold text-[40px]"
              style={{ margin: 0 }}
            >
              More Restaurants
            </h1>
            <br />
            <div className="flex-col">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex-container py-4">
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white 
                    px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px] 
                    bg-[#FFF1F1] bg-cover hover:border-[#5AF0D5] max-w-none h-[200px]"
                  >
                    <div className="flex text-black">
                      <div className="w-1/2 flex justify-center">
                        <div className="w-40 h-20 relative">
                          <div className="absolute inset-0">
                            <img
                              className=" object-cover rounded-3xl border-[2px] border-white"
                              src={restaurant.image}
                              alt={restaurant.name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-start pl-6">
                        <span className="text-[25px] font-regular text-center">
                          {restaurant.name}
                        </span>
                        <div className="box-container">
                          <p className="text-[15px] font-normal ml-[0px] text-left overflow-y">
                            {restaurant.description}
                          </p>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]">
                            Location
                          </button>
                          <Link
                            to="/resto_review"
                            className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md"
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