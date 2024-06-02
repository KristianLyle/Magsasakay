import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import user from "./img/default-user.jpg";
import city from "./img/city.png";
import DeleteConfirmation from "./deleteConfirmation";
import PasswordConfirmation from "./passwordConfirmation";
import PasswordSaveConfirmation from "./passwordSaveConfirmation";

const ProfileCard = () => {
  const [editingInfo, setEditingInfo] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [editedPicture, setEditedPicture] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [displayedPicture, setDisplayedPicture] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [deleteButtonState, setDeleteButtonState] = useState(true);
  const [confirmationDeleteButtonState, setConfirmationDeleteButtonState] =
    useState(false);
  const [showSavePasswordConfirmation, setShowSavePasswordConfirmation] =
    useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;
    Axios.post("http://localhost:3001/fetch-user-details", { userEmail })
      .then((response) => {
        setCurrentUser(response.data);
        setEditedName(response.data.username); // Set initial name value
        setEditedEmail(response.data.email); // Set initial email value
        setEditedPicture(response.data.userimage); // Set initial picture value
        setDisplayedPicture(response.data.userimage); // Set initial displayed picture value
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleEditInfoClick = () => {
    setEditingInfo(true);
    setDeleteButtonState(false);
    setConfirmationDeleteButtonState(false);
  };

  const handleInitialSaveInfoClick = () => {
    if (editedPassword && editedPassword !== retypePassword) {
      alert("New passwords do not match.");
      setDeleteButtonState(false);
      return;
    }
    setShowSavePasswordConfirmation(true);
  };

  const handleCheckPassword = () => {
    Axios.post("http://localhost:3001/check-password", {
      email: currentUser.email,
      password: passwordInput,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Password confirmed");
          setShowSavePasswordConfirmation(false);
          handleSaveInfoClick();
        } else {
          console.error("Failed to confirm password");
          alert("Incorrect password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error while confirming password:", error);
        alert("Incorrect password. Please try again.");
      });
  };

  const handleSaveInfoClick = () => {
    setDeleteButtonState(true);

    if (showPasswordConfirmation && confirmationDeleteButtonState == false) {
      setConfirmationDeleteButtonState(true);
      setDeleteButtonState(false);
    }

    if (editedPassword && editedPassword !== retypePassword) {
      alert("New passwords do not match.");
      setDeleteButtonState(false);
      return;
    }

    const updateData = {};

    if (editedName && editedName !== currentUser.username) {
      updateData.username = editedName;
    }

    if (editedEmail && editedEmail !== currentUser.email) {
      updateData.email = editedEmail;
    }

    if (editedPassword) {
      updateData.password = editedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      setEditingInfo(false);
      return;
    }

    Axios.post("http://localhost:3001/update-user-info", {
      currentEmail: currentUser.email,
      ...updateData,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setEditingInfo(false);
          // Update the user details in the state with the new info
          setCurrentUser((prevUser) => ({
            ...prevUser,
            ...updateData,
          }));
          // Clear the password fields
          setEditedPassword("");
          setRetypePassword("");
        } else {
          console.error("Failed to update user information");
        }
      })
      .catch((error) => {
        console.error("Error while updating user information:", error);
      });
  };

  const handleCancelInfoClick = () => {
    setEditingInfo(false);
    // Reset the edited fields to the current user information
    setEditedName(currentUser.name);
    setEditedEmail(currentUser.email);
    setEditedPassword("");
    setRetypePassword("");
    setDeleteButtonState(true);

    if (showPasswordConfirmation && confirmationDeleteButtonState == false) {
      setConfirmationDeleteButtonState(true);
      setDeleteButtonState(false);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", editedPicture);
    formData.append("email", currentUser.email);

    const result = await Axios.post(
      "http://localhost:3001/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setShowSaveButton(false); // Hide the "Save Picture" button after uploading
    setDisplayedPicture(URL.createObjectURL(editedPicture)); // Display the uploaded image immediately
    window.location.reload();
  };

  const handleCancelImageClick = () => {
    window.location.reload();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setDisplayedPicture(URL.createObjectURL(file));
    setEditedPicture(file);
    setShowSaveButton(true); // Show the "Save Picture" button when an image is selected
  };

  //Delete acc functions
  const handleDeleteAccount = () => {
    setShowConfirmation(true);
  };

  const handleInitialConfirmation = () => {
    setShowPasswordConfirmation(true);
    setShowConfirmation(false);
    setDeleteButtonState(false);
  };

  const handleConfirmDelete = () => {
    Axios.post("http://localhost:3001/delete-user", {
      email: currentUser.email,
      password: passwordInput,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Account deleted successfully");
          window.localStorage.removeItem("token");
          window.localStorage.setItem("loggedIn", false);
          history.push("/");
          window.location.reload();
          setShowConfirmation(false);
        } else {
          console.error("Failed to delete user account");
          alert("Incorrect password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error while deleting user account:", error);
        alert("Incorrect password. Please try again.");
      });
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelDeletePassword = () => {
    setShowPasswordConfirmation(false);
    setDeleteButtonState(true);
  };

  const handleCancelDeleteSave = () => {
    setShowSavePasswordConfirmation(false);
  };

  return (
    <>
      <div
        className="w-[505px] h-full rounded-[4px] pb-[20px] bg-gradient-to-t from-blue-400 to-orange-500 text-center font-Montserrat
                     phone:w-4/5 phone:h-1/2 phone:pb-0
                     md:w-[505px] md:h-full md:pb-[20px] "
      >
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
              src={displayedPicture || user}
              className="h-[200px] w-[200px] rounded-[100px] mt-[-125px] p-[5px] bg-white ml-[150px]
                        phone:w-2/3 phone:h-2/3 phone:ml-7 phone:mt-[-75px]
                        md:w-[200px] md:h-[200px] md:ml-[150px] md:mt-[-125px] md:rounded-full"
            />
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePictureChange}
            />
            {showSaveButton && (
              <>
                <button
                  onClick={submitImage}
                  className="ml-2 bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl font-Montserrat px-[25px] max-w-[200px]"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelImageClick}
                  className="ml-2 bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl font-Montserrat px-[25px] max-w-[200px]"
                >
                  Cancel
                </button>
                <br />
              </>
            )}
          </label>
          <div
            className="profile-title text-[26px] font-semibold text-white
                          phone:text-base mt-[2%]
                          md:text-[26px] "
          >
            {currentUser.username}
          </div>
          <div className="text-white font-thin">{currentUser.email}</div>

          <br />

          {editingInfo ? (
            <div
              className="profile-description px-1 py-5 text-[15px] bg-orange-100 max-w-[450px] max-h-[450px] text-center ml-[27px] overflow-auto
                            phone:text-[7.5px] phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px] 
                            md:text-[15px] md:ml-[27px] md:mr-0 md:max-w-[450px] rounded-lg absolute z-1
                            "
            >
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-[400px] p-2 mb-2
                           phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px]
                           md:ml-[27px] md:mr-0 md:max-w-[450px] rounded-lg"
                placeholder="Enter your name"
              />
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="w-[400px] p-2 mb-2
                           phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px]
                           md:ml-[27px] md:mr-0 md:max-w-[450px] rounded-lg"
                placeholder="Enter your email"
                readOnly
              />
              <input
                type="password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
                className="w-[400px] p-2 mb-2
                           phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px]
                           md:ml-[27px] md:mr-0 md:max-w-[450px] rounded-lg"
                placeholder="Enter new password"
              />
              <input
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                className="w-[400px] p-2 mb-2
                           phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px]
                           md:ml-[27px] md:mr-0 md:max-w-[450px] rounded-lg"
                placeholder="Retype new password"
              />
              <button
                onClick={handleInitialSaveInfoClick}
                className="bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]
                          phone:text-xs phone:max-w-[125px]
                          md:text-[15px] md:max-w-[200px]"
              >
                Save Info
              </button>
              {showSavePasswordConfirmation && (
                <PasswordSaveConfirmation
                  message="Enter your password to confirm"
                  onConfirm={handleCheckPassword}
                  onCancel={handleCancelDeleteSave}
                  setPasswordInput={setPasswordInput}
                />
              )}
              <button
                onClick={handleCancelInfoClick}
                className="ml-[5px] bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]
                          phone:text-xs phone:max-w-[125px]
                          md:text-[15px] md:max-w-[200px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              className="profile-description px-1 py-5 text-[15px] bg-orange-100 max-w-[450px] max-h-[450px] text-center rounded-[15px] overflow-auto
                            phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px]
                            md:ml-[27px] md:mr-0 md:max-w-[450px]"
            >
              <button
                onClick={handleEditInfoClick}
                className=" bg-[#EE7200] text-[15px] py-2 rounded-full font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mt-[10px] font-Montserrat px-[25px] max-w-[200px]
                          phone:text-xs phone:max-w-[125px]
                          md:text-[15px] md:max-w-[200px]"
              >
                Edit Profile Info
              </button>
            </div>
          )}
        </div>
        {deleteButtonState && (
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600  relative z-0 font-Montserrat rounded-full py-2 font-bold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl px-[25px] max-w-[200px] mt-[5%] justify-end ml-[50%]"
          >
            Delete Account
          </button>
        )}
        {showConfirmation && (
          <DeleteConfirmation
            message="Are you sure you want to delete your account?"
            onConfirm={handleInitialConfirmation}
            onCancel={handleCancelDelete}
          />
        )}
        {showPasswordConfirmation && (
          <PasswordConfirmation
            message="Enter your password to confirm"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDeletePassword}
            setPasswordInput={setPasswordInput}
          />
        )}
      </div>
    </>
  );
};

export default ProfileCard;
