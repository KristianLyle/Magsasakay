import React, { useState } from "react";

const PasswordConfirmation = ({ onConfirm, onCancel, setPasswordInput }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordInput(newPassword); // Call the callback function to set the password in the parent component
  };

  return (
    <div className="font-Montserrat fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-700 z-[99] bg-opacity-30">
      <div className="bg-white p-5 rounded-lg text-center text-black">
        <input
          type="password"
          className="w-[400px] p-2 mb-2
                          phone:ml-1/3 phone:mr-4/5 phone:max-w-[150px]
                          md:ml-[27px] md:mr-0 md:max-w-[450px] rounded-lg "
          placeholder="Enter your password to confirm"
          value={password}
          onChange={handlePasswordChange}
        />{" "}
        <br />
        <button
          className="mr-[5px] bg-[#ff0000] rounded-full py-2 font-bold text-white hover:bg-[#160E3D] drop-shadow-2xl px-[25px] max-w-[200px]"
          onClick={onConfirm}
        >
          {" "}
          Delete{" "}
        </button>
        <button
          className="bg-[#EE7200] rounded-full py-2 font-bold text-white hover:bg-[#160E3D] drop-shadow-2xl px-[25px] max-w-[200px]"
          onClick={onCancel}
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
};

export default PasswordConfirmation;
