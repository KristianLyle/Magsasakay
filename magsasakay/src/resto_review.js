import { useEffect, useState } from "react";
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

  const handlePostText = async () => {
    if (inputText.trim() !== "") {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userName = decodedToken.username;

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
    Axios.post("http://localhost:3001/fetch-reviews", {
      restaurantName: restaurantName,
    })
      .then((response) => {
        setPostedReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  }, [restaurantName]);

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
        className="bg-cover bg-full bg-center min-h-screen"
      >
        <div className="mx-auto min-h-screen flex flex-col overflow-y-auto bg-no-repeat ml-[60px] mr-[50px]">
          <br />
          <div className=" flex items-center">
            <h1
              className="text-white font-Montserrat mt-4 text-left font-extrabold text-[40px]"
              style={{ margin: 0 }}
            >
              {restaurantDetails.name}
            </h1>{" "}
            <div className="flex items-center ml-[10px]">
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
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "#yourDesiredHoverColor")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color =
                      i < restaurantDetails.averageRating ? "#FFD700" : "#ccc")
                  }
                />
              ))}
            </div>
          </div>{" "}
          <br />
          <div className="flex py-2 font-Montserrat bg-white rounded-3xl">
            <img
              style={{ width: "200px", height: "150px" }}
              src={`/${restaurantDetails.image}`}
              alt={restaurantDetails.name}
              className="object-cover rounded-3xl border-[2px] border-[#160E3D] ml-[10px]"
            />
            <p className="mt-[30px] p-[10px]">
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
            </div>
            <textarea
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Write your review here..."
              className="h-[100px] max-w-[100%] w-[1200px] border border-gray-300 rounded p-2 ml-[40px]"
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
                              font-bold text-white hover:bg-white hover:text-[#160E3D]
                              drop-shadow-2xl font-Montserrat px-[25px] max-w-[200px] mb-[60px] hover:bg-[#FACA15]"
              >
                Cancel
              </button>
            </div>
          </div>
          {postedReviews.length > 0 && (
            <div>
              <ul>
                {postedReviews
                  .slice(0)
                  .reverse()
                  .map((review, index) => (
                    <li key={index}>
                      <div className="bg-white max-w-[1300px] ml-[40px] mr-[40px] rounded-[20px] p-[10px] font-Montserrat border-[4px] border-black drop-shadow-2xl">
                        <div className="flex items-start  ">
                          <img
                            src={`/${review.userimage}`}
                            width="100px"
                            height="96px"
                            className="border-[3px] rounded-full border-black"
                          />
                          <div className="flex flex-col items-start ml-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon
                                  key={i}
                                  icon={
                                    i < review.rating ? faStar : ["far", "star"]
                                  }
                                  style={{ color: "#FFD700", fontSize: "24px" }}
                                />
                              ))}
                            </div>
                            <p className="ml-2 font-medium max-w-[1000px] py-5">
                              {review.review}
                            </p>
                          </div>
                        </div>
                        <p className="max-w-[1300px] ml-[10px] text-[14px] font-bold mt-2">
                          {review.username}
                        </p>
                      </div>
                      <br />
                    </li>
                  ))}
              </ul>
              <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RestoReviews;
