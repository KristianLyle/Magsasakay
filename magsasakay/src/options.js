import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import landmark from "./img/location.jpg";
import route from "./img/route.jpeg";
import option_bg from "./img/option_bg.jpeg";

const Options = () => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(13, 112, 177, 0.7), rgba(140, 13, 240, 0.7)), url(${option_bg})`,
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
        className="bg-cover bg-no-repeat bg-center bg-fixed min-h-screen flex justify-center"
      >
        <div className="mx-auto">
          <div className="">
            <br />
            <h1 className="text-white font-Montserrat font-extrabold  mt-20 text-4xl md:text-8xl text-center">
              Select Option
            </h1>{" "}
            <br />
            <br /> <br />
            <div className="mx-auto mb-20 flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
              <div className="flex flex-col items-center">
                <div
                  className="font-Montserrat font-bold text-xl md:text-4xl text-center text-white 
                                px-3 py-3 mx-8 md:mx-16 rounded-3xl inline-block border-white border-2
                                bg-[#8C0DF0] bg-cover enlarge-on-hover hover:bg-opacity-100 transform hover:scale-110
                                hover:border-[#5AF0D5]  hover:text-[#160E3D] glow transition-transform duration-300 delay-100"
                >
                  <Link to="/find-routes">
                    <div className="flex justify-center">
                      <div className="w-40 md:w-80 h-30 md:h-60 overflow-hidden">
                        <img
                        className="w-full h-full object-cover rounded-3xl"
                        src={landmark}
                        alt=""
                      />
                      </div>
                      
                    </div>
                    <span>
                      Locate <br /> Destination
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="font-Montserrat font-bold text-xl md:text-4xl text-center text-white 
                                px-3 py-3 mx-16 rounded-3xl inline-block border-white border-2
                                bg-[#0D70B1] bg-cover enlarge-on-hover hover:bg-opacity-100 transform hover:scale-110
                                hover:border-[#5AF0D5]  hover:text-[#160E3D] glow transition-transform duration-300 delay-100"
                >
                  <Link to="/view-routes">
                    <div className="flex justify-center">
                      <div className="w-40 md:w-80 h-30 md:h-60">
                        <img
                        className="w-full h-full object-cover rounded-3xl"
                        src={route}
                        alt=""
                      />
                      </div>
                      
                    </div>

                    <span>
                      View <br />
                      PUV Routes
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Options;
