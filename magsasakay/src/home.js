import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Carousel } from "flowbite-react";
import home_req from "./img/home_req.png";
import wheretoeat from "./img/wheretoeat.png";
import viewRoute_req from "./img/viewRoute_req.png";
import devs from "./img/devs.png";
import home_bg from "./img/home_bg.png";
import slide1bg from "./img/slide1bg.jpg";
import food from "./img/food.png";
import jaro from "./img/jaro.jpg";
import festive from "./img/festive.jpg";
import "./index.css";

const Home = () => {
  const [bgImage, setBgImage] = useState(slide1bg);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;
    Axios.post("http://localhost:3001/fetch-user-details", { userEmail })
      .then((response) => {
        console.log("User details fetched:", response.data);
        setUserName(response.data.username); // Set initial name value
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleSlideChange = (index) => {
    console.log("Slide changed to index:", index);
    if (index === 0) {
      setBgImage(slide1bg);
    } else if (index == 1) {
      setBgImage(food);
    } else if (index == 2) {
      setBgImage(jaro);
    } else if (index == 3) {
      setBgImage(festive);
    }
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
        className="relative z-[0] bg-cover font-Montserrat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-sky-950 bg-opacity-75"></div>
        <h1 className="font-extrabold text-white ml-[2.5%] text-left relative z-10 py-[10px] md:text-[150%] lg:text-[350%]">
          Welcome back, {userName}!
        </h1>
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen mt-[-100px] overflow-auto">
          <Carousel
            className="w-full mx-auto rounded-2xl"
            onSlideChange={handleSlideChange}
          >
            {/* slide 1 */}
            <div className="slide-content my-14 md:my-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <img
                src={home_req}
                alt="Home Picture"
                className="w-1/2 md:w-full md:max-w-md mx-auto"
              />
              <div className="text-center md:text-left">
                <h1 className="text-lg md:text-3xl lg:text-[350%] font-semibold mb-2 md:mb-4 text-white">
                  Where to Go
                </h1>
                <div className="text-white leading-snug text-lg md:text-3xl lg:text-[350%] font-semibold">
                  {" "}
                  In Iloilo{" "}
                </div>
                <p className="text-white text-sm md:text-base mt-2 md:mt-4 lg:text-[150%]">
                  Discover seamless public transportation options to your
                  destination and explore top-rated traveler-recommended
                  restaurants in the city. Plan your journey effortlessly, read
                  honest reviews. Your guide to travel and dining adventures.
                  Start exploring now!
                </p>
                <div className="text-white font-Montserrat font-semibold lg:text-[200%] text-sm md:text-[24px] text-center mt-2 md:mt-4 bg-resto_but rounded-full inline-block border-white border-[2px] px-4 md:px-10 py-2 md:py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                  <Link to="/routes">Where to go in Iloilo</Link>
                </div>
              </div>
            </div>

            {/* slide 2 */}
            <div className="slide-content my-14 md:my-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <img
                src={wheretoeat}
                alt="Restaurants Picture"
                className="w-1/2 md:w-full md:max-w-md mx-auto"
              />
              <div className="text-center md:text-left">
                <h1 className="text-lg md:text-3xl font-semibold mb-2 md:mb-4 text-white">
                  Discover
                </h1>
                <div className="text-white leading-snug text-lg md:text-3xl font-semibold lg:text-[350%]">
                  {" "}
                  Iloilo's Finest{" "}
                </div>
                <p className="text-white text-sm md:text-base mt-2 md:mt-4 lg:text-[150%]">
                  Explore Iloilo's diverse dining scene, ranging from
                  traditional eateries to bistros, each offering a unique blend
                  of flavors inspired by the city's rich heritage. Join us as we
                  uncover the culinary gems of Iloilo, promising unforgettable
                  dining experiences at every turn.
                </p>
                <div className="text-white font-Montserrat lg:text-[200%] font-semibold text-sm md:text-[24px] text-center mt-2 md:mt-4 bg-wte_bg rounded-full inline-block border-white border-[2px] px-4 md:px-10 py-2 md:py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                  <Link to="/restaurants">Explore Restaurants</Link>
                </div>
              </div>
            </div>

            {/* slide 3 */}
            <div className="slide-content my-14 md:my-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <img
                src={viewRoute_req}
                alt="Home Picture"
                className="w-1/2 md:w-full md:max-w-xs mx-auto"
              />
              <div className="text-center md:text-left">
                <h1 className="text-lg md:text-3xl font-semibold mb-2 md:mb-4 text-white">
                  View your
                </h1>
                <div className="text-white leading-snug text-lg md:text-3xl font-semibold lg:text-[350%]">
                  {" "}
                  Profile{" "}
                </div>
                <p className="text-white text-sm md:text-base mt-2 md:mt-4 lg:text-[150%]">
                  Welcome to your profile! This is your personal space where you
                  can showcase your interests, and experiences. From sharing
                  your latest adventures to expressing yourself freely. Explore,
                  update, and make this space truly yours. Let your profile
                  reflect the unique story of who you are.
                </p>
                <div className="text-white font-Montserrat font-semibold text-sm md:text-[24px] lg:text-[200%] text-center mt-2 md:mt-4 bg-ilonight rounded-full inline-block border-white border-[2px] px-4 md:px-10 py-2 md:py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                  <Link to="/profile">Visit Profile</Link>
                </div>
              </div>
            </div>

            {/* slide 4 */}
            <div className="slide-content my-14 md:my-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <img
                src={devs}
                alt="Home Picture"
                className="w-1/2 md:w-full md:max-w-xs mx-auto"
              />
              <div className="text-center md:text-left">
                <h1 className="text-lg md:text-3xl font-semibold mb-2 md:mb-4 text-white">
                  Meet the
                </h1>
                <div className="text-white leading-snug text-lg md:text-3xl font-semibold lg:text-[350%]">
                  {" "}
                  Developers{" "}
                </div>
                <p className="text-white text-sm md:text-base mt-2 md:mt-4 lg:text-[150%]">
                  Come and meet the team behind the project 'Magsasakay'! We're
                  a group of passionate individuals dedicated to revolutionizing
                  the way people commute. Together, we're shaping the future of
                  transportation, one innovative idea at a time. Get to know us,
                  our mission, and our journey as we pave the way for a
                  smoother, smarter way to travel. Welcome aboard!
                </p>
                <div className="text-white font-Montserrat font-semibold text-sm lg:text-[200%] md:text-[24px] text-center mt-2 md:mt-4 bg-iloilo1 rounded-full inline-block border-white border-[2px] px-4 md:px-10 py-2 md:py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                  <Link to="/about">About us</Link>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home;
