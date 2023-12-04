import React, { useState } from 'react';

const ProfileReviews = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, restaurantName: 'Restaurant 1', reviewText: 'Lorem ipsum...' },
    { id: 2, restaurantName: 'Restaurant 2', reviewText: 'Another review...' },
    // Add more reviews as needed
  ]);

  const handleEditClick = (index, initialText) => {
    setEditingIndex(index);
    setEditedText(initialText);
  };

  const handleSaveClick = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].reviewText = editedText;
    setReviews(updatedReviews);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  return (
    <div className="ml-[550px] font-Montserrat bg-[#7826D0] max-w-[900px] text-white p-[5px] rounded-[30px]">
      <h1 className="ml-[20px] font-extrabold text-[35px]">Restaurant Reviews</h1>
      <ul className="ml-[15px] p-[5px]">
        {reviews.map((review, index) => (
          <li key={review.id} className="max-w-[500px] px-[2px]">
            <h2 className="text-[20px] font-regular">{review.restaurantName}</h2>
            {editingIndex === index ? (
              <div className="bg-white text-black px-1 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] rounded-[15px] overflow-y-auto">
                <textarea
                  className = 'w-full h-full'
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button className='bg-[#EE7200] text-[14px] py-2 rounded-full font-bold text-white 
                hover:bg-[#160E3D] hover:text-white drop-shadow-2xl mt-[1px] font-Montserrat  
                max-w-[100px] w-[90px]' onClick={() => handleSaveClick(index)}>
                    Save</button>
                <button className='ml-[5px] bg-[#EE7200] text-[14px] py-2 rounded-full font-bold text-white 
                hover:bg-[#160E3D] hover:text-white drop-shadow-2xl mt-[1px] font-Montserrat  
                max-w-[100px] w-[90px]' onClick={handleCancelClick}>
                    Cancel</button>
              </div>
            ) : (
              <div className="bg-white text-black px-1 py-5 text-[15px] w-[850px] max-w-[900px] max-h-[100px] rounded-[15px] overflow-auto">
                {review.reviewText}
              </div>
            )}
            <div>
              <button
                className="bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]"
                onClick={() => handleEditClick(index, review.reviewText)}
              >
                Edit Review
              </button>
              <button className="ml-[5px] bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]">
                Delete Review
              </button>
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileReviews;
