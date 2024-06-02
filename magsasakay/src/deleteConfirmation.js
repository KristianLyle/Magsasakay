import React, { useState, useEffect } from "react";

const DeleteConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="font-Montserrat fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-700 z-[99] bg-opacity-30">
      <div className="bg-white p-5 rounded-lg text-center text-black">
        <p>{message}</p> <br />
        <button
          className="mr-[5px] bg-[#ff0000] rounded-full py-2 font-bold text-white hover:bg-[#160E3D] drop-shadow-2xl px-[25px] max-w-[200px]"
          onClick={onConfirm}
        >
          {" "}
          Confirm{" "}
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

export default DeleteConfirmation;
