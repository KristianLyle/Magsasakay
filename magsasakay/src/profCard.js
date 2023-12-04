import React, { useState } from 'react';
import user from './img/dev3.jpg';
import city from './img/city.png';

const ProfileCard = () => {
  const [editingBio, setEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(
    'Former macho dancer but now a highly skilled developer known for his proficiency in various programming languages and a knack for tackling complex coding challenges. His dedication to clean, efficient code and strong problem-solving abilities make him a valuable asset.'
  );

  const backgroundStyle = {
    backgroundImage: `url(${city})`,
  };

  const handleEditBioClick = () => {
    setEditingBio(true);
  };

  const handleSaveBioClick = () => {
    setEditingBio(false);
    // Perform any additional actions on save, if needed
  };

  const handleCancelBioClick = () => {
    setEditingBio(false);
  };

  return (
    <>
      <div className='w-[505px] h-full rounded-[4px] pb-[20px] bg-gradient-to-t from-blue-400 to-orange-500 text-center font-Montserrat'>
        <div className='h-[350px] rounded-[4px_4px_0px_0px]' style={backgroundStyle}></div>
        <div className='profile-down items-center'>
          <img src={user} className='h-[200px] w-[200px] rounded-[100px] mt-[-125px] p-[5px] bg-white ml-[150px]' />
          <div className='profile-title text-[26px] font-semibold text-white'>Johnny No Sins</div>
          <div className='profile-button py-[10px] text-white'>
            <a href='mailto: nosins@gmail.com'>nosins@gmail.com</a>
          </div>
          {editingBio ? (
            <div className='profile-description px-1 py-5 text-[15px] bg-orange-100 max-w-[450px] max-h-[450px] text-center ml-[27px] rounded-[15px] overflow-auto'>
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className='w-[400px] h-[150px] p-2'  
              />
              <button onClick={handleSaveBioClick} className='bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]'>
                Save Bio
              </button>
              <button onClick={handleCancelBioClick} className='ml-[5px] bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]'>
                Cancel
              </button>
            </div>
          ) : (
            <div className='profile-description px-1 py-5 text-[15px] bg-orange-100 max-w-[450px] max-h-[450px] text-center ml-[27px] rounded-[15px] overflow-auto'>
              <p className='bg-orange'>{editedBio}</p>
              <button onClick={handleEditBioClick} className='ml-[350px] underline hover:text-white'>
                Edit Bio
              </button>
            </div>
          )}
          <div className='profile-button'>
            <a href='mailto:'></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
