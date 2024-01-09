import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import about from "./img/about.png";
import profile from "./img/profile.png";
import routes from "./img/routes.png";
import home_req from "./img/home_req.png";
import restaurant from "./img/restaurant.png";

const Home = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>

      <div className="bg-home_bg bg-cover h-[120vh] overflow-hidden relative">
        <div className="container h-full w-[150%] relative z-10">
          <div className="text-white">
            <br />
            <h1 className="font-Montserrat font-extrabold text-[55px] ml-[10px]">
              Welcome to Magsasakay!
            </h1>{" "}
            <br />
            <p className="font-Montserrat font-regular text-[20px] ml-[10px]">
              Discover seamless public transportation options to your
              destination and explore <br /> top-rated traveler-recommended
              restaurants in the city. Plan your journey effortlessly, <br />{" "}
              read honest reviews. Your guide to travel and dining adventures.
              Start exploring now!
            </p>{" "}
            <img
              src={home_req}
              alt="client request for home page"
              width="400px"
              className="ml-[175px]"
            />
            <br /> <br />
            <div className="font-Montserrat font-semibold text-[50px] text-center bg-wte_bg ml-[100px] rounded-full inline-block border-white border-[2px] px-10 py-2 transform hover:scale-110 hover:font-semibold hover:text-[orange]">
              <Link to="/routes">Where to go in Iloilo</Link>
            </div>{" "}
            <br /> <br /> <br /> <br />
            <ul className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] text-center items-center ml-[100px] gap-x-[50px]">
              <li className="w-[175px] text-[35px] flex flex-col transform hover:scale-110 hover:font-semibold hover:text-[orange]">
                <Link to="/about">
                  <img src={about} alt="about" />
                  <span className="ml-[-25px]">About</span>
                </Link>
              </li>
              <br />
              <li className="w-[175px] text-[35px] flex flex-col transform hover:scale-110 hover:font-semibold hover:text-[orange]">
                <Link to="/profile">
                  <img src={profile} alt="profile" />
                  <span className="ml-[-25px]">Profile</span>
                </Link>
              </li>
              <br />
              <li className="w-[175px] text-[35px] flex flex-col transform hover:scale-110 hover:font-semibold hover:text-[orange]">
                <Link to="/restaurants">
                  <img src={restaurant} alt="restaurants" />
                  <span className="ml-[-25px]">Restaurants</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
