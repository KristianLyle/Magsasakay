import React, { useState, useEffect } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import DeleteConfirmation from "./deleteConfirmation";
import { Link } from "react-router-dom";

const ProfileReviews = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [reviews, setReviews] = useState([]);

  //Delete confirmation functions
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleConfirmDelete = () => {
    const reviewId = localStorage.getItem("reviewID");
    // Send a request to the server to delete the review from the database
    Axios.post("http://localhost:3001/delete-review", {
      reviewId,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          // Filter out the deleted review from the local state
          const updatedReviews = reviews.filter(
            (review) => review._id !== reviewId
          );
          setReviews(updatedReviews);
        } else {
          console.error("Failed to delete review");
        }
      })
      .catch((error) => {
        console.error("Error while deleting review:", error);
      });
    setShowConfirmation(false);
  };

  const handleCancelDelete = (reviewId) => {
    setShowConfirmation(false);
  };

  // Fetch reviews from the server on component mount
  useEffect(() => {
    // Fetch reviews for the logged-in user
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.username;
    Axios.post("http://localhost:3001/fetch-user-reviews", { userName })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user reviews:", error);
      });
  }, []);

  const handleEditClick = (index, initialText) => {
    setEditingIndex(index);
    setEditedText(initialText);
  };

  const handleDeleteClick = (reviewId) => {
    window.localStorage.setItem("reviewID", reviewId);
    setShowConfirmation(true);
  };

  const handleSaveClick = (index, reviewId) => {
    // Send a request to the server to update the review in the database
    Axios.post("http://localhost:3001/update-review", {
      reviewId,
      reviewText: editedText,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setEditingIndex(null);
          window.location.reload();
        } else {
          console.error("Failed to update review");
        }
      })
      .catch((error) => {
        console.error("Error while updating review:", error);
      });
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  return (
    <div className="ml-[550px] font-Montserrat bg-[#7826D0] max-w-full text-white p-[5px] rounded-[30px]
                   phone:ml-[205px] phone:max-w-[190px] phone:p-[1px]
                   md:ml-[550px] md:max-w-full md-p-[5px] md:mr-[20px]">

      <h1 className="ml-[20px] font-extrabold text-[35px]
                    phone:ml-[15px] phone:text-[25px] phone:p-[1px] phone:text-center
                    md:ml-[20px] md:text-[35px]">
        Restaurant Reviews
      </h1>
      
      <ul className="ml-[15px] p-[5px]">
        {reviews.map((review, index) => (
          <li key={review._id} className="max-w-[500px] px-[2px]">
            <Link
              className="text-[20px] font-regular
                        phone:text-[15px] md:text-[20px]"
              to={`/resto_review/${encodeURIComponent(review.restaurant)}`}
            >
              {review.restaurant}
            </Link>

            {editingIndex === index ? (
              <div className="bg-white text-black px-1 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] rounded-[15px] overflow-y-auto
                              phone:text-[7px] phone:w-[90%] phone:max-w-[90%] phone:min-h-[50%]
                              md:text-[15px] md:w-[850px] md:max-w-[900px] ">
                <textarea
                  className="w-full h-full"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  className="bg-[#EE7200] text-[14px] py-2 rounded-full font-bold text-white 
                  hover:bg-[#160E3D] hover:text-white drop-shadow-2xl mt-[1px] font-Montserrat  max-w-[100px] w-[90px]
                  phone:w-[65%] phone:text-[75%]
                  md:w-[90px] md:text-[14px]"
                  onClick={() => handleSaveClick(index, review._id)}
                >
                  Save
                </button>
                <button
                  className="ml-[5px] bg-[#EE7200] text-[14px] py-2 rounded-full font-bold text-white hover:bg-[#160E3D] hover:text-white drop-shadow-2xl mt-[1px] font-Montserrat  
                  max-w-[100px] w-[90px]
                  phone:w-[65%] phone:text-[75%]
                  md:w-[90px] md:text-[14px]"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="bg-white text-black px-3 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] min-h-[100px] rounded-[15px] overflow-auto
                             phone:text-[7px] phone:w-[90%] phone:max-w-[90%] phone:min-h-[50%]
                             md:text-[15px] md:w-[850px] md:max-w-[900px] md:min-h-[100px]
                             ">
                {review.review}
              </div>
            )}
            <div>
              <button
                className="bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]
                          phone:w-[75%] phone:text-[55%]
                          md:w-[100%] md:text-[15px]
                          "
                onClick={() => handleEditClick(index, review.review)}
              >
                Edit Review
              </button>
              <button
                className="ml-[5px] bg-[#BF2F00] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]
                          phone:w-[85%] phone:text-[55%]
                          md:w-[100%] md:text-[15px]"
                onClick={() => handleDeleteClick(review._id)}
                // onClick={() => handleDeleteClick()}
              >
                Delete Review
              </button>
              {showConfirmation && (
                <DeleteConfirmation
                  message="Are you sure you want to delete?"
                  onConfirm={() => handleConfirmDelete(review._id)}
                  onCancel={handleCancelDelete}
                />
              )}
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileReviews;
