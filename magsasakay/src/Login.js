import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import logo from './img/logo.png';


const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <>
    <div className="container grid h-screen grid-cols-2 bg-image1 bg-contain">
      <div className="flex flex-col items-center justify-center inset-0 bg-gradient-to-b from-transparent to-[#EA9769]">
        <form className="loginForm max-w-[400px] max-h-[425px] h-full w-full mx-auto bg-[#7826D0] p-8 px-8 rounded-[37px] drop-shadow-2xl">
          <h1 className='text-center text-white font-Montserrat font-semibold text-[35px]'> Login to Continue </h1>
          <br />
          <label className="text-white font-regular font-Montserrat" htmlFor="email">
            Email
          </label>
          <br />
          <input
            className=" border border-black border-lg rounded-[10px] w-full p-2"
            type="email"
            placeholder="Enter email here"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <br /> <br />
          <label className="text-white font-Montserrat font-regular" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="border border-black border-lg rounded-[10px] w-full p-2"
            type="password"
            placeholder="Enter password here"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <br />
          <br />
          <div className="createAccount font-light text-center text-white font-Montserrat">
            <p>Don't have an account yet?</p> <Link className="underline hover:text-black" to="/SignUp">Click Here!</Link> <br /> 
          </div>
          <br />
          <div className='text-center'>
          <button className="hover:bg-[#160E3D] hover:text-[#F9BE60] 
                              px-[55px] text-center bg-[#F9BE60] 
                              rounded-full drop-shadow-lg text-[20px] 
                              font-Montserrat font-semibold">
            Login </button>
          </div>
          <br /> <br />
        </form>
      </div>
      <div className="container flex flex-col items-center justify-center h-full bg-[#160E3D]">
    <img src={logo} alt='logo'></img>
    <p className='text-white font-Montserrat font-light'> 2023 All Rights Reserved </p>
    </div>
    </div>
    </>
  );
}

export default Login;
