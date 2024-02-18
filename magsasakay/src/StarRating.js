import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const StarRating = ({ onRatingChange }) => {
  const [internalSelectedRating, setInternalSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setInternalSelectedRating(rating);
    onRatingChange(rating);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`cursor-pointer ${
            internalSelectedRating > index ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(index + 1)}
          style={{ fontSize: '38px' }} // Added style to make stars bigger
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
      ))}
    </div>
  );
};

export default StarRating;