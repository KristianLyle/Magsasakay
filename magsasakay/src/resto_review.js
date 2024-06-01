import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./index.css";
import NavBar from "./navbar";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom";
import resto_bg from "./img/resto_bg.jpg";
import StarRating from "./StarRating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RestoReviews = () => {
  const { restaurantName } = useParams();
  const backgroundStyle = {
    backgroundImage: `url(${resto_bg})`,
  };
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [postedReviews, setPostedReviews] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFullReview, setShowFullReview] = useState(false); // Define showFullReview state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const history = useHistory();

  useEffect(() => {
    const status = window.localStorage.getItem("loggedIn");
    if (status === "false") {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  useEffect(() => {
    Axios.post("http://localhost:3001/fetch-restaurant-details", {
      restaurantName: restaurantName,
    })
      .then((response) => {
        setRestaurantDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  }, [restaurantName]);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleCancelButtonClick = () => {
    setInputText("");
    setShowInput(false);
  };

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.username;

  const handlePostText = async () => {
    if (inputText.trim() !== "") {
      try {
        const userResponse = await Axios.post(
          "http://localhost:3001/fetch-user-details",
          {
            userName: userName,
          }
        );

        const userImage = userResponse.data.userimage;

        const reviewData = {
          restaurantName: restaurantName,
          username: userName,
          userimage: userImage,
          reviewText: inputText,
          starRating: selectedRating,
        };

        const response = await Axios.post(
          "http://localhost:3001/submit-review",
          reviewData
        );

        if (response.status === 201) {
          const newReview = {
            userimage: userImage,
            review: inputText,
            username: userName,
            rating: selectedRating,
          };
          setPostedReviews([newReview, ...postedReviews]);
          setInputText("");
          setShowInput(false);
          window.location.reload();
        } else {
          console.error("Failed to submit review");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    Axios.post("http://localhost:3001/fetch-recent-reviews", {
      restaurantName: restaurantName,
    })
      .then((response) => {
        setPostedReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  }, [restaurantName]);

  const Review = ({ review }) => {
    const [showFullReview, setShowFullReview] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
      };

      handleResize(); // Check on initial render
      window.addEventListener("resize", handleResize); // Add event listener for window resize
      return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
    }, []);

    const toggleShowFullReview = () => {
      setShowFullReview(!showFullReview);
    };

    const splitText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + "...";
    };

    return (
      <div
        className={`bg-white max-w-[1300px] ml-[40px] mr-[40px] rounded-[20px] p-[10px] font-Montserrat border-[4px] border-black drop-shadow-2xl ${
          showFullReview && "h-auto"
        }`}
      >
        <div className="flex flex-wrap items-center md:items-start md:flex-nowrap">
          <div className="flex items-center justify-center md:justify-start md:mr-4">
            <div className="flex flex-col md:items-center">
              <img
                src={`/${review.userimage}`}
                width="100px"
                height="96px"
                className="border-[3px] rounded-full border-black"
              />
              <div className="ml-2 md:ml-0">
                <p className="text-[14px] font-bold mt-2">{review.username}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start mt-4 ml-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < review.rating ? faStar : ["far", "star"]}
                  style={{ color: "#FFD700", fontSize: "24px" }}
                  className="review-star-icon"
                />
              ))}
            </div>
            <p className="text-[12px] text-gray-500 mt-1">
              {new Date(review.createdAt).toLocaleDateString()}{" "}
              {new Date(review.createdAt).toLocaleTimeString()}
            </p>
            <p
              className={`ml-2 font-medium max-w-[1000px] py-5 ${
                showFullReview || !isSmallScreen
                  ? "overflow-y-visible"
                  : "overflow-y-hidden"
              }`}
              style={{ wordWrap: "break-word", wordBreak: "break-word" }}
            >
              {showFullReview ? review.review : splitText(review.review, 100)}
              {!showFullReview && review.review.length > 100 && (
                <span
                  className="text-blue-500 cursor-pointer ml-2"
                  onClick={toggleShowFullReview}
                >
                  View More
                </span>
              )}
              {showFullReview && (
                <span
                  className="text-blue-500 cursor-pointer ml-2"
                  onClick={toggleShowFullReview}
                >
                  ... View Less
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Logic for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = postedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        className="bg-cover bg-full bg-center min-h-screen overflow-x-hidden"
      >
        <div className="mx-auto min-h-screen flex flex-col overflow-y-auto overflow-x-auto bg-no-repeat ml-[60px] mr-[50px]">
          <br />
          <div className=" flex flex-col md:flex-row items-justify">
            <h1
              className="text-white font-Montserrat mt-4 text-left font-extrabold text-[40px]"
              style={{ margin: 0 }}
            >
              {restaurantDetails.name}
            </h1>{" "}
            <div className="flex items-center ml-[-2px] md:ml-[20px] mt-2 md:mt-0 mb-4 md:mb-0">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={
                    i < restaurantDetails.averageRating
                      ? faStar
                      : ["far", "star"]
                  }
                  className="star-icon"
                  style={{
                    color:
                      i < restaurantDetails.averageRating ? "#FFD700" : "#ccc",
                    fontSize: "30px",
                    marginRight: "4px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "#yourDesiredHoverColor")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color =
                      i < restaurantDetails.averageRating ? "#FFD700" : "#ccc")
                  }
                />
              ))}{" "}
            </div>
          </div>{" "}
          <h1
            className="text-white font-Montserrat mt-4 text-left font-extrabold text-[20px]"
            style={{ margin: 0 }}
          >
            {restaurantDetails.location}
          </h1>{" "}
          <br />
          <div className="flex flex-col md:flex-row py-2 font-Montserrat bg-gray-200 rounded-3xl overflow-hidden items-center">
            <img
              style={{ width: "200px", height: "150px" }}
              src={`/${restaurantDetails.image}`}
              alt={restaurantDetails.name}
              className="object-cover rounded-3xl border-[2px] border-[#160E3D]  mt-[10px] mb-[10px] md:ml-[10px] md:mt-[10px] md:mb-[10px]"
            />
            <p className="mt-[0px] p-[10px] ml-3 overflow-ellipsis overflow-wrap break-words text-center md:text-justify">
              {restaurantDetails.description}
            </p>
          </div>
          <br />
          <br />
          <div className="flex flex-col ">
            <div className="ml-[40px] mb-[5px]">
              <StarRating
                onRatingChange={setSelectedRating}
                selectedRating={selectedRating}
              />
              <h1
                className="text-white font-Montserrat mt-4 text-left font-extrabold text-[20px]"
                style={{ margin: 0 }}
              >
                {userName}
              </h1>{" "}
            </div>
            <textarea
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Write your review here..."
              className="h-[100px] max-w-[100%] w-[1200px] border border-gray-300 rounded-lg p-4 ml-[40px] focus:outline-one focus:ring-2 focus:ring-blue-500 overflow-y-auto"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
            />
            <div className="flex flex-col ml-[40px] ">
              <button
                style={{ marginTop: "10px", marginBottom: "10px" }}
                onClick={handlePostText}
                className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                                                            font-bold text-white hover:bg-white hover:text-[#160E3D] 
                                                            drop-shadow-2xl font-Montserrat px-[25px] max-w-[200px] mb-[60px]"
              >
                Post Review
              </button>
              <button
                style={{ marginTop: "2px" }}
                onClick={handleCancelButtonClick}
                className="bg-[#BF2F00] text-[15px] py-2 rounded-full
                              font-bold text-white hover:bg-white hover:text-[#BF2F00] 
                              drop-shadow-2xl font-Montserrat px-[25px] max-w-[200px] mb-[60px]"
              >
                Cancel
              </button>
            </div>
          </div>
          {currentReviews.length > 0 && (
            <div>
              <ul>
                {currentReviews.map((review, index) => (
                  <li key={index}>
                    <Review review={review} />
                    <br />
                  </li>
                ))}
              </ul>
              <br />
              <nav className="flex justify-center mt-1">
                <ul className="pagination flex flex-row">
                  {Array.from({
                    length: Math.ceil(postedReviews.length / reviewsPerPage),
                  }).map((_, index) => (
                    <li key={index} className="px-2 mb-[15px]">
                      <a
                        onClick={() => paginate(index + 1)}
                        href="#"
                        className={` font-Montserrat font-extrabold px-4 py-2 rounded-full hover:bg-[#160E3D] hover:text-white ${
                          currentPage === index + 1
                            ? "bg-[#160E3D] text-white px-4 py-2 rounded-full"
                            : "bg-[#EE7200] text-[#160E3D]"
                        }`}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RestoReviews;
