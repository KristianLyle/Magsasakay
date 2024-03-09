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
    <div className="ml-[550px] font-Montserrat bg-[#7826D0] max-w-[900px] text-white p-[5px] rounded-[30px]">
      <h1 className="ml-[20px] font-extrabold text-[35px]">
        Restaurant Reviews
      </h1>
      <ul className="ml-[15px] p-[5px]">
        {reviews.map((review, index) => (
          <li key={review._id} className="max-w-[500px] px-[2px]">
            {/* tabang */}
            <Link
              className="text-[20px] font-regular"
              to={`/resto_review/${encodeURIComponent(review.restaurant)}`}
            >
              {review.restaurant}
            </Link>

            {editingIndex === index ? (
              <div className="bg-white text-black px-1 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] rounded-[15px] overflow-y-auto">
                <textarea
                  className="w-full h-full"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  className="bg-[#EE7200] text-[14px] py-2 rounded-full font-bold text-white 
                  hover:bg-[#160E3D] hover:text-white drop-shadow-2xl mt-[1px] font-Montserrat  
                  max-w-[100px] w-[90px]"
                  onClick={() => handleSaveClick(index, review._id)}
                >
                  Save
                </button>
                <button
                  className="ml-[5px] bg-[#EE7200] text-[14px] py-2 rounded-full font-bold text-white 
                  hover:bg-[#160E3D] hover:text-white drop-shadow-2xl mt-[1px] font-Montserrat  
                  max-w-[100px] w-[90px]"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="bg-white text-black px-1 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] min-h-[100px] rounded-[15px] overflow-auto">
                {review.review}
              </div>
            )}
            <div>
              <button
                className="bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]"
                onClick={() => handleEditClick(index, review.review)}
              >
                Edit Review
              </button>
              <button
                className="ml-[5px] bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]"
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
