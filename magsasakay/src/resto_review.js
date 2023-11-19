import { useEffect, useState } from "react";
import Axios from "axios";
import "./index.css";
import NavBar from "./navbar";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import resto_bg from "./img/resto_bg.jpg";
import user from "./img/user.jpg";

const RestoReviews = () => {
  const location = useLocation();
  const { restaurantName } = location.state;
  const backgroundStyle = {
    backgroundImage: `url(${resto_bg})`,
  };
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [postedText, setPostedText] = useState([]);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handlePostText = () => {
    if (inputText.trim() !== "") {
      // Decode the token to get user information
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userName = decodedToken.username;
      const selectedColor = decodedToken.color;
      const reviewData = {
        restaurantName: restaurantName,
        username: userName,
        userimage: user,
        reviewText: inputText,
        color: selectedColor,
      };

      // Make a POST request to the server to submit the review
      Axios.post("http://localhost:3001/submit-review", reviewData)
        .then((response) => {
          if (response.status === 201) {
            // Review submitted successfully
            setPostedText([...postedText, inputText]);
            setInputText("");
            setShowInput(false);
            // Refresh the page
            window.location.reload();
          } else {
            console.error("Failed to submit review");
          }
        })
        .catch((error) => {
          console.error("Error while submitting review:", error);
        });
    }
  };

  useEffect(() => {
    // Fetch restaurant data from the API
    Axios.post("http://localhost:3001/fetch-reviews", {
      restaurantName: restaurantName,
    })
      .then((response) => {
        setPostedText(response.data);
        console.log(response.data);
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
        className="bg-contain bg-full bg-center min-h-screen"
      >
        <div className="mx-auto min-h-screen flex flex-col overflow-y-auto bg-no-repeat">
          <h1
            className="text-white font-Montserrat mt-4 text-left font-extrabold text-[40px]"
            style={{ margin: 0 }}
          >
            {restaurantName}
          </h1>{" "}
          <br />
          {postedText.length > 0 && (
            <div>
              <br />
              <ul>
                {postedText.map((review, index) => (
                  <li key={index}>
                    <div className="bg-white max-w-[1300px] ml-[20px] rounded-[20px] p-[10px] font-Montserrat border-[4px] border-black drop-shadow-2xl">
                      <div className="flex items-center  ">
                        <img
                          src={review.userimage}
                          width="100px"
                          height="96px"
                          className="border-[3px] rounded-full border-black"
                        />
                        <p className="ml-[10px] font-medium">{review.review}</p>
                      </div>
                      <p className="max-w-[1300px] ml-[10px] text-[14px] font-bold">
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
          <button
            onClick={handleButtonClick}
            className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                            font-bold text-white hover:bg-white hover:text-[#160E3D] 
                            drop-shadow-2xl ml-[20px] font-Montserrat px-[25px] max-w-[200px]"
          >
            Write Review
          </button>{" "}
          <br />
          {showInput && (
            <div>
              <textarea
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="h-[100px] max-w-[100%] w-[1200px] border border-gray-300 rounded p-2 ml-[20px]"
              />{" "}
              <br />
              <button
                onClick={handlePostText}
                className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                                    font-bold text-white hover.bg-white hover.text-[#160E3D] 
                                    drop-shadow-2xl ml-[20px] font-Montserrat px-[25px] max-w-[200px]"
              >
                Post Review
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RestoReviews;
