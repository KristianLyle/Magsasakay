import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMap, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Options = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div className="bg-[#240750] bg-cover bg-no-repeat bg-center bg-fixed min-h-screen flex justify-center">
        <div className="mx-auto">
          <div className="">
            <br />
            <h1 className="text-white font-Montserrat font-extrabold text-4xl md:text-6xl text-center pt-20">
              Select Option
            </h1>
            <br />
            <br />
            <br />
            <div className="mx-auto mb-20 flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
              <div className="flex flex-col items-center">
                <div
                  className="font-Montserrat font-bold text-xl md:text-2xl text-center text-white 
                            mx-8 md:mx-16 rounded-3xl  
                            bg-[#160E3D] bg-cover enlarge-on-hover hover:bg-[#57A6A1] hover:bg-opacity-100 transform hover:translate-y-[-10px]
                            hover:text-[#160E3D] glow transition-transform duration-300 delay-200 flex items-center justify-center w-40 h-40 md:w-80 md:h-80"
                >
                  <Link to="/find-routes" className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl md:text-5xl mb-4" />
                      <span>Locate Destination</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="font-Montserrat font-bold text-xl md:text-2xl text-center text-white 
                            mx-16 rounded-3xl  
                            bg-[#344C64] bg-cover enlarge-on-hover hover:bg-[#57A6A1] hover:bg-opacity-100 transform hover:translate-y-[-10px]
                            hover:text-[#160E3D] glow transition-transform duration-300 delay-200 flex items-center justify-center w-40 h-40 md:w-80 md:h-80"
                >
                  <Link to="/view-routes" className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <FontAwesomeIcon icon={faMap} className="text-3xl md:text-5xl mb-4" />
                      <span>View PUV Routes</span>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
            {/* Back Button */}
            <div className="flex justify-center">
              <Link to="/home" className="text-white text-xl font-semibold hover:underline mt-4">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Options;
