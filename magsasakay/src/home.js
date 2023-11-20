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


const Home = () => {
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
    opacity: 0.5,
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>

      <div className="bg-home_bg bg-cover h-[120vh] w-[195.9vh] relative">
        <div style={backgroundOverlay}></div>
        <div className="container h-screen max-w-[120%] relative z-10 bg-cover">
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
            <img src={home_req} alt="client request for home page" width="400px" className="ml-[175px]"/>
            <br /> <br /> 
            <div className="font-Montserrat font-semibold text-[50px] text-center bg-wte_bg ml-[100px] rounded-full inline-block border-white border-[2px] px-10 py-2">
              <Link to="/restaurants">Where to eat in Iloilo</Link>
            </div>{" "}
            <br /> <br /> <br /> <br />
            <ul className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] text-center items-center ml-[100px] gap-x-[50px]">
              <li className="w-[175px] text-[35px] flex flex-col">
                <Link to="/about">
                  <img src={about} alt="about" />
                  <span className="ml-[-25px]">About</span>
                </Link>
              </li>
              <br />
              <li className="w-[175px] text-[35px] flex flex-col">
                <Link to="/profile">
                  <img src={profile} alt="profile" />
                  <span className="ml-[-25px]">Profile</span>
                </Link>
              </li>
              <br />
              <li className="w-[175px] text-[35px] flex flex-col transform hover:scale-110 hover:font-semibold hover:text-[orange]">
                <Link to="/routes">
                  <img src={routes} alt="routes" />
                  <span className="ml-[-25px]">Routes</span>
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
