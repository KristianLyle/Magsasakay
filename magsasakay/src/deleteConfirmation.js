import React, { useState, useEffect } from "react";

const DeleteConfirmation = ({ message, onConfirm, onCancel }) => {
    return (
    <div className= 'fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-700 z-[99] bg-opacity-30'>
        <div className="bg-white p-5 rounded-lg text-center text-black">
            <p>{message}</p>
            <button className="mr-[5px]" onClick={onConfirm}> Confirm </button>
            <button onClick={onCancel}> Cancel </button>
        </div>
    </div>
    );
  };
  
  export default DeleteConfirmation;