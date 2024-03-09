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

  const [isOpen, setIsOpen] = useState(false);

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
    // Store the selected restaurant name in localStorage
    localStorage.setItem("selectedRestaurantId", restaurantName);

    // Redirect to Location page
    history.push(`/location/${restaurantName}`);
  };

  //const backgroundStyle = {
  //backgroundImage: `url(${resto_bg})`,
  //};

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div
        //style={backgroundStyle}
        className="bg-resto_bg bg-cover bg-center min-h-screen w-screen mx-auto"
      >
        <div className="mx-auto h-screen">
          <div className="">
            <br />
            <h1
              className="text-white font-Montserrat mt-4 text-center font-extrabold text-[40px]"
              style={{ margin: 0 }}
            >
              You Might Like
            </h1>
            <br />
            <div className="mx-auto flex justify-center items-center space-x-35">
              {restaurants.map((restaurant, index) => (
                <div className="flex-container" key={index}>
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white 
                    							   px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                   								 bg-[#160E3D] hover:border-[#5AF0D5] min-w-[350px] max-w-[350px] min-h-[500px] max-h-[1000px]"
                  >
                    {/* Render restaurant details from the API */}
                    <div className="flex justify-center items-center">
                      <img
                        className="w-80 h-60 object-cover rounded-3xl border-[2px] border-white"
                        src={restaurant.image}
                        alt={restaurant.name}
                      />
                    </div>
                    <span className="text-[20px] font-regular">
                      {restaurant.name}
                    </span>
                    <div className="box-container text-left">
                      <p
                        style={isOpen ? null : descStyle}
                        ref={ref}
                        className="text-[12px] font-normal ml-[0px] text-left "
                      >
                        {restaurant.description}
                      </p>
                      {showReadMore && (
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className=" underline font-Montserrat font-light text-[12px]"
                        >
                          {" "}
                          {isOpen ? "Read Less" : "Read More"}
                        </button>
                      )}
                      <br />
                    </div>
                    <div>
                      <button
                        onClick={() => handleLocationClick(restaurant.name)}
                        className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]"
                      >
                        Location
                      </button>
                      <Link
                        to={`/resto_review/${encodeURIComponent(
                          restaurant.name
                        )}`} // Pass the restaurant name in the URL
                        className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl"
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
									drop-shadow-2xl font-Montserrat px-[50px]"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
