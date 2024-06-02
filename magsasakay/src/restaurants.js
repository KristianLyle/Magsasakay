import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import resto_bg from "./img/resto_bg.jpg";
import { useHistory } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const status = window.localStorage.getItem("loggedIn");
    if (status === "false") {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  const descStyle = {
    WebkitLineClamp: 3,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
  };

  const [showReadMore, setShowReadMore] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.scrollHeight, ref.current.clientHeight);
      setShowReadMore(ref.current.scrollHeight != ref.current.clientHeight);
    }
  });

  useEffect(() => {
    // Fetch restaurant data from the API
    fetch("http://localhost:3001/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  }, []);

  const handleLocationClick = (restaurantName) => {
    const encodedRestaurantName = encodeURIComponent(restaurantName);
    history.push(`/find-routes?restaurant=${encodedRestaurantName}`);
  };

  //const backgroundStyle = {
  //backgroundImage: `url(${resto_bg})`,
  //};

  return (
    <div className="overflow-x-hidden bg-resto_bg bg-cover bg-center">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div
        //style={backgroundStyle}
        className=" min-h-screen w-screen mx-auto "
      >
        <div className="mx-auto h-screen">
          <div className="">
            <br />
            <h1
              className="text-white font-Montserrat mt-4 text-center font-extrabold text-[40px]
                        phone:text-base
                        md:text-[40px]"
              style={{ margin: 0 }}
            >
              You Might Like
            </h1>
            <br />
            <div
              className="mx-auto flex justify-center items-center space-x-35
                            phone:space-x-[1000px] lg:space-x-10
                          "
            >
              {restaurants.map((restaurant, index) => (
                <div className="flex-container" key={index}>
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white 
                    					 px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                   					 bg-[#160E3D] hover:border-[#5AF0D5] min-w-[350px] max-w-[350px] min-h-[500px] max-h-[1000px] overflow-auto
                               phone:min-w-[150px] phone:w-[120px] phone:min-h-[100px] phone:h-[300px] phone:max-h-[350px]
                               md:min-w-[350px] md:w-[350px] md:min-h-[500px] md:max-h-[1000px] md:h-[500px] md:flex md:flex-col"
                  >
                    {/* Render restaurant details from the API */}
                    <div className="flex justify-center items-center">
                      <img
                        className="w-80 h-60 object-cover rounded-3xl border-[2px] border-white
                                  phone:w-30 phone:h-20 phone:rounded-2xl
                                  md:w-80 md:h-60 md:rounded-3xl"
                        src={restaurant.image}
                        alt={restaurant.name}
                      />
                    </div>
                    <div
                      className="text-[20px] font-regular
                                    phone:text-[10px] phone:leading-tight phone:mt-[10px] phone:mb-[10px]
                                    md:text-[20px]"
                    >
                      {restaurant.name}
                    </div>
                    <div className="box-container text-left">
                      <p
                        style={descStyle}
                        ref={ref}
                        className="text-[12px] font-normal ml-[0px] text-left overflow-x-hidden overflow-auto
                                  phone:text-[6px]
                                  md:text-[12px]"
                      >
                        {restaurant.description}
                      </p>
                      <br className="phone:hidden" />
                    </div>
                    <div>
                      <button
                        onClick={() => handleLocationClick(restaurant.name)}
                        className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]
                                  phone:text-[6px] phone:px-3
                                  md:text-[15px] md:px-6"
                      >
                        Location
                      </button>
                      <Link
                        to={`/resto_review/${encodeURIComponent(
                          restaurant.name
                        )}`} // Pass the restaurant name in the URL
                        className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl
                                  phone:text-[6px] phone:px-3
                                  md:text-[15px] md:px-6"
                      >
                        View Reviews
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
            <br /> <br />
            <div className="flex justify-center items-center">
              <Link
                to="restoViewMore"
                className="bg-[#EE7200] text-[15px] py-2 rounded-full 
									font-bold text-white hover:bg-white hover:text-[#160E3D] 
									drop-shadow-2xl font-Montserrat px-[50px]
                  phone:text-[10px]
                  md:text-[15px]"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
