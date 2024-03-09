import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const StarRating = ({ onRatingChange }) => {
  const [internalSelectedRating, setInternalSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0); // Add state for hoveredRating

  const handleStarClick = (rating) => {
    setInternalSelectedRating(rating);
    onRatingChange(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`cursor-pointer ${
            hoveredRating > index ? 'text-yellow-500' : internalSelectedRating > index ? 'text-yellow-500' : 'text-gray-300' // Change color based on hover and selected
          }`}
          onClick={() => handleStarClick(index + 1)}
          onMouseEnter={() => handleStarHover(index + 1)} // Handle star hover
          onMouseLeave={handleStarLeave} // Handle mouse leave
          style={{ fontSize: '38px' }} // Added style to make stars bigger
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
