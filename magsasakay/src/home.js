import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import home_req from "./img/home_req.png";
import {Carousel} from "flowbite-react";
import viewRoute_req from "./img/viewRoute_req.png";
import wheretoeat from "./img/wheretoeat.png";
import devs from "./img/devs.png";


const Home = () => {
    return ( 
        <>
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/" />
            </Switch>
        </Router>
            <div className= "relative bg-slide1bg bg-cover font-Montserrat">
            <div className="absolute inset-0 bg-sky-950 bg-opacity-80"></div>
            <h1 className ="font-extrabold text-white ml-[15px] text-left relative z-10 py-[5px] text-[40px]"> 
            Welcome to Magsasakay </h1>
                <div className= "px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen mt-[-100px]">
                    <Carousel className= "w-full mx-auto rounded-2xl">
                        {/* slide 1 */}
                        <div className="bg-cover my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between px-[10px]
                        gap-12"> 
                            <div className="z-10 relative">
                                <img src={home_req} alt="Home Picture"/> 
                            </div>
                            <div className= "md:w-1/2 z-10 relative">
                                <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                                    Where to Go
                                </h1> <div className="mt-[-20px] text-white leading-snug text-5xl font-semibold"> In Iloilo </div>
                                <p className="text-white text-base mb-8">
                                    Discover seamless public transportation options to your
                                    destination and explore top-rated traveler-recommended
                                    restaurants in the city. Plan your journey effortlessly,
                                    read honest reviews. Your guide to travel and dining adventures.
                                    Start exploring now!
                                </p>
                                <div className="text-white font-Montserrat font-semibold text-[40px] text-center ml-[20px] bg-resto_but rounded-full inline-block border-white border-[2px] px-10 py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                                     <Link to="/routes">Where to go in Iloilo</Link>
                                </div>
                            </div>
                        </div>
                        {/* slide 2 */}
                        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between
                        gap-12">
                            <div>
                                <img src={wheretoeat} alt="Restaurants Picture"/> 
                            </div>
                            <div className= "md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                                    Discover
                                </h1> <div className="mt-[-20px] text-white leading-snug text-5xl font-semibold"> Iloilo's Finest </div>
                                <p className="text-white text-base mb-8">
                                    Explore Iloilo's diverse dining scene, ranging from traditional 
                                    eateries to bistros, each offering a unique blend of flavors inspired 
                                    by the city's rich heritage. Join us as we uncover the culinary gems of Iloilo, 
                                    promising unforgettable dining experiences at every turn.
                                </p>
                                <div className="text-white font-Montserrat font-semibold text-[40px] text-center ml-[20px] bg-wte_bg rounded-full inline-block border-white border-[2px] px-10 py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                                    <Link to="/restaurants">Explore Restaurants</Link>
                                </div>
                            </div>
                        </div>
                        {/* slide 3 */}
                        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between
                        gap-12">
                            <div>
                                <img src={viewRoute_req} alt="Home Picture" className="w-3/5 ml-[250px]"/> 
                            </div>
                            <div className= "md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                                    View your
                                </h1> <div className="mt-[-20px] text-white leading-snug text-5xl font-semibold"> Profile </div>
                                <p className="text-white text-base mb-8">
                                Welcome to your profile! This is your personal space where 
                                you can showcase your interests, and experiences. 
                                From sharing your latest adventures to expressing yourself freely. Explore, update, 
                                and make this space truly yours. Let your profile reflect the unique story of who you are.
                                </p>
                                <div className="text-white font-Montserrat font-semibold text-[40px] text-center ml-[20px] bg-ilonight rounded-full inline-block border-white border-[2px] px-10 py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                                    <Link to="/profile">Visit Profile</Link>
                                </div>
                            </div>
                        </div>

                        {/* slide 3 */}
                        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between
                        gap-12">
                            <div>
                                <img src={devs} alt="Home Picture" className="w-2/3 m-[200px]"/> 
                            </div>
                            <div className= "md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                                    Meet the
                                </h1> <div className="mt-[-20px] text-white leading-snug text-5xl font-semibold"> Developers </div>
                                <p className="text-white text-base mb-8">
                                Come and meet the team behind the project 'Magsasakay'! We're a group 
                                of passionate individuals dedicated to revolutionizing the way people 
                                commute. Together, we're shaping the future of transportation, one 
                                innovative idea at a time. Get to know us, our mission, and our journey 
                                as we pave the way for a smoother, smarter way to travel. Welcome aboard!
                                </p>
                                <div className="text-white font-Montserrat font-semibold text-[40px] text-center ml-[20px] bg-iloilo1 rounded-full inline-block border-white border-[2px] px-10 py-2 transform hover:scale-105 hover:font-semibold hover:text-[orange]">
                                    <Link to="/about">About us</Link>
                                </div>
                            </div>
                        </div>
                    </Carousel>

                </div>
            </div>
        </>
     );
}
 
export default Home;