import React, { useState, useEffect } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import DeleteConfirmation from "./deleteConfirmation";
import { Link } from "react-router-dom";

const ProfileReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    Axios.post("http://localhost:3001/fetch-user-reviews", { userEmail })
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
    setShowConfirmation(true);
    window.localStorage.setItem("reviewId", reviewId);
  };

  const handleSaveClick = (index, reviewId) => {
    Axios.post("http://localhost:3001/update-review", {
      reviewId,
      reviewText: editedText,
    })
      .then((response) => {
        if (response.status === 201) {
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

  const handleConfirmDelete = () => {
    const reviewId = window.localStorage.getItem("reviewId");
    Axios.post("http://localhost:3001/delete-review", {
      reviewId,
    })
      .then((response) => {
        if (response.status === 201) {
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

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  // Logic to paginate reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Logic to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate range of pagination buttons
  const maxPage = Math.ceil(reviews.length / reviewsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(startPage + 2, maxPage);

  return (
    <div className="font-Montserrat bg-[#461E96] text-white p-5 rounded-lg
             w-full md:w-full md:max-w-[1000px] md:ml-auto md:mr-auto">


      <h1
        className="ml-[20px] font-extrabold text-[35px]
                    phone:ml-[15px] phone:text-[25px] phone:p-[1px] phone:text-center
                    md:ml-[20px] md:text-[35px]"
      >
        Restaurant Reviews
      </h1>

      <ul className="ml-[15px] p-[5px]">
        {currentReviews.map((review, index) => (
          <li key={review._id} className="max-w-[500px] px-[2px]">
            <Link
              className="text-[20px] font-regular
                        phone:text-[15px] md:text-[20px]"
              to={`/resto_review/${encodeURIComponent(review.restaurant)}`}
            >
              {review.restaurant}
            </Link>
            <p className="text-[12px] text-gray-1000 mt-1">
              {new Date(review.createdAt).toLocaleDateString()}{" "}
              {new Date(review.createdAt).toLocaleTimeString()}
            </p>

            {editingIndex === index ? (
              <div
                className="bg-white text-black px-1 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] rounded-[15px] overflow-y-auto
                              phone:text-[7px] phone:w-[90%] phone:max-w-[90%] phone:min-h-[50%]
                              md:text-[15px] md:w-[850px] md:max-w-[900px] "
              >
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
              <div
                className="bg-white text-black px-3 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] min-h-[100px] rounded-[15px] overflow-auto
                             phone:text-[7px] phone:w-[90%] phone:max-w-[90%] phone:min-h-[50%]
                             md:text-[15px] md:w-[850px] md:max-w-[900px] md:min-h-[100px]
                             "
              >
                {review.review}
              </div>
            )}
            <div>
            <button
                className="bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white
                 hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[210px]
                          phone:w-[40%] phone:text-[55%]
                          md:w-[100%] md:text-[15px]
                          "
                onClick={() => handleEditClick(index, review.review)}
              >
                Edit Review
              </button>
              <button
                className="ml-[5px] bg-[#BF2F00] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white
                 hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[210px] max-h-8
                          phone:w-[40%] phone:text-[55%]
                          md:w-[100%] md:text-[15px]"
                onClick={() => handleDeleteClick(review._id)}
              >
                Delete Review
              </button>
              {showConfirmation && (
                <DeleteConfirmation
                  message="Are you sure you want to delete?"
                  onConfirm={() => handleConfirmDelete()}
                  onCancel={handleCancelDelete}
                />
              )}
            </div>
            <br />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav className="flex justify-center mt-1">
        <ul className="pagination flex flex-row">
          {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
            <li key={startPage + index} className="px-2 mb-[15px]">
              <a
                onClick={() => paginate(startPage + index)}
                href="#"
                className={`font-Montserrat font-extrabold px-4 py-2 rounded-full hover:bg-[#160E3D] hover:text-white ${
                  currentPage === startPage + index
                    ? "bg-[#160E3D] text-white px-4 py-2 rounded-full"
                    : "bg-[#EE7200] text-[#160E3D]"
                }`}
              >
                {startPage + index}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProfileReviews;

