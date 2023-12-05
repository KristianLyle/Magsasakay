import React, { useState, useEffect } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import user from "./img/default-user.png";
import city from "./img/city.png";

const ProfileCard = () => {
  const [editingBio, setEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [editedPicture, setEditedPicture] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Fetch user details from the server on component mount
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.username;
    Axios.post("http://localhost:3001/fetch-user-details", { userName })
      .then((response) => {
        setCurrentUser(response.data);
        setEditedBio(response.data.bio); // Set initial bio value
        setEditedPicture(response.data.userimage); // Set initial picture value
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${city})`,
  };

  const handleEditBioClick = () => {
    setEditingBio(true);
  };

  const handleSaveBioClick = () => {
    // Send a request to the server to update the user bio in the database
    Axios.post("http://localhost:3001/update-user-bio", {
      email: currentUser.email,
      bio: editedBio,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setEditingBio(false);
          // Update the user details in the state with the new bio
          setCurrentUser((prevUser) => ({
            ...prevUser,
            bio: editedBio,
          }));
        } else {
          console.error("Failed to update bio");
        }
      })
      .catch((error) => {
        console.error("Error while updating bio:", error);
      });
  };

  const handleCancelBioClick = () => {
    setEditingBio(false);
    // Reset the editedBio state to the current bio
    setEditedBio(currentUser.bio);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setEditedPicture(URL.createObjectURL(file));
    // Save the picture to the server
  };

  return (
    <>
      <div className="w-[505px] h-full rounded-[4px] pb-[20px] bg-gradient-to-t from-blue-400 to-orange-500 text-center font-Montserrat">
        <div
          className="h-[350px] rounded-[4px_4px_0px_0px]"
          style={{ backgroundImage: `url(${city})` }}
        ></div>
        <div className="profile-down items-center">
          <label
            htmlFor="profile-picture"
            className="cursor-pointer hover:opacity-75"
          >
            <img
              src={editedPicture || user}
              className="h-[200px] w-[200px] rounded-[100px] mt-[-125px] p-[5px] bg-white ml-[150px]"
            />
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePictureChange}
            />
          </label>
          <div className="profile-title text-[26px] font-semibold text-white">
            {currentUser.username}
          </div>
          <div className="profile-button py-[10px] text-white">
            <a href={`mailto: ${currentUser.email}`}>{currentUser.email}</a>
          </div>
          {editingBio ? (
            <div className="profile-description px-1 py-5 text-[15px] bg-orange-100 max-w-[450px] max-h-[450px] text-center ml-[27px] rounded-[15px] overflow-auto">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-[400px] h-[150px] p-2"
                placeholder="Enter your bio here..."
              />
              <button
                onClick={handleSaveBioClick}
                className="bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]"
              >
                Save Bio
              </button>
              <button
                onClick={handleCancelBioClick}
                className="ml-[5px] bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="profile-description px-1 py-5 text-[15px] bg-orange-100 max-w-[450px] max-h-[450px] text-center ml-[27px] rounded-[15px] overflow-auto">
              <p className="bg-orange">{currentUser.bio}</p>
              <button
                onClick={handleEditBioClick}
                className="ml-[350px] underline hover:text-white"
              >
                Edit Bio
              </button>
            </div>
          )}
          <div className="profile-button">
            <a href={`mailto: ${currentUser.email}`}></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
