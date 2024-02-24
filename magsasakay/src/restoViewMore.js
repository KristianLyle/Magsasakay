import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ViewMore = () => {
  const [restaurants, setRestaurants] = useState([]);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const descStyle = {
    WebkitLineClamp: 2,
	  overflow: 'hidden',
	  WebkitBoxOrient: 'vertical',
	  display: '-webkit-box'
  }

  const [showReadMore, setShowReadMore] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      console.log('scrollHeight:', ref.current.scrollHeight);
      console.log('clientHeight:', ref.current.clientHeight);
      setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
    } else {
      console.log('Ref is null');
    }
  }, [restaurants])

  useEffect(() => {
    // Fetch restaurant data from the API
    fetch("http://localhost:3001/view-more-restaurants")
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
                <div key={restaurant.id} className="flex-container py-4 ">
                  <div
                    className="font-Montserrat font-bold text-[35px] text-center text-white 
                    px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px] 
                    bg-[#FFF1F1] bg-cover hover:border-[#5AF0D5] max-w-none max-h-[550px] text-ellipsis ..."
                  >
                    <div className="flex text-black">
                      <div className="w-1/3 flex justify-start pl-8">
                        <div className="w-40 h-20 relative">
                          <div className="">
                            <img
                              className="object-cover rounded-3xl border-[2px] border-[#160E3D]"
                              src={restaurant.image}
                              alt={restaurant.name}
                              style={{ width: "200px", height: "150px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full text-start ml-[-150px] ">
                        <span className="text-[25px] font-regular">
                          {restaurant.name}
                        </span>

                        <div className="box-container ">
                          <p style={ isOpen ? null : descStyle
                          }
                          ref= {ref}
                          className="text-[15px] font-normal text-left">
                            {restaurant.description}
                          </p>
                          {showReadMore && (
                            <button onClick={() => setIsOpen(!isOpen)}
                            className = 'underline font-Montserrat font-light text-[17px]'> {isOpen ? 'Read Less' : 'Read More'}
                           </button>
                          )}       
                        </div>

                        <div className="flex justify-end mt-[8px]">
                          <button
                            onClick={() => handleLocationClick(restaurant.name)}
                            className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]"
                          >
                            Location
                          </button>
                          <Link
                            to={`/resto_review/${encodeURIComponent(
                              restaurant.name
                            )}`}
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
