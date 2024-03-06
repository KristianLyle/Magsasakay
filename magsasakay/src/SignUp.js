import { useState } from "react";
import signupImg from "./img/img1.jpg";
import { Link } from "react-router-dom";
import "./index.css";
import Axios from "axios";
import logo from "./img/logo.png";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [accountRegistered, setAccountRegistered] = useState(null);

  const HandleSignUp = (e) => {
    e.preventDefault();

    if (userPassword === userPassword2) {
      setPasswordMismatch(false); // Passwords match, set to false
      const user = { userName, userEmail, userPassword };
      console.log(user);
      setAccountRegistered(true);

      Axios.post("http://localhost:3001/signup", {
        email: user.userEmail,
        username: user.userName,
        password: user.userPassword,
      }).then((response) => {
        if (response.data.message === "Email already exists") {
          // Display an error message that the email already exists
          setAccountRegistered("Email already exists");
        } else if (response.data.message === "User created successfully.") {
          // Registration was successful
          setAccountRegistered("User created successfully.");
        }
      });
    } else {
      setPasswordMismatch(true); // Passwords don't match, set to true
    }
  };
  return (
    <div className="min-h-screen relative flex font-Montserrat">
        <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute w-[100%] h-screen bg-image1 bg-cover opacity-100"></div>
        <div className="absolute w-[100%] h-screen bg-gradient-to-t from-orange-500 to-cyan-500 opacity-60"></div>
        <div className="w-full max-w-md p-8 rounded-[37px] drop-shadow-2xl text-white">
        <form
          className="max-w-[400px] w-full mx-auto bg-[#7826D0] p-8 px-8 rounded-[37px] relative drop-shadow-2xl"
          onSubmit={HandleSignUp}
        >
          <h2 className="mb-10 text-[35px] dark:text-white font-semibold font-montserrat text-center">
            {" "}
            Set Up Your Account
          </h2>

          <div className="mb-5">
            <label className=" text-gray-200 font-montserrat" htmlFor="email">
              Username
            </label>{" "}
            <br></br>
            <input
              className=" border border-black border-lg rounded-[10px] w-full p-2"
              type="text"
              placeholder="Enter username here"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />{" "}
            <br></br>
          </div>
          <div className="mb-5">
            <label className=" text-gray-200 font-montserrat" fhtmlFor="email">
              Email
            </label>{" "}
            <br></br>
            <input
              className=" border border-black border-lg rounded-[10px] w-full p-2"
              type="email"
              placeholder="Enter email here"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />{" "}
            <br></br>
          </div>
          <div className="mb-5">
            <label
              className=" text-gray-200 font-montserrat"
              htmlFor="password"
            >
              Password
            </label>{" "}
            <br></br>
            <input
              className="border border-black border-lg rounded-[10px] w-full p-2"
              type="password"
              placeholder="Enter password here"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />{" "}
            <br></br>
          </div>
          <div className="mb-5">
            <label
              className=" text-gray-200 font-montserrat"
              htmlFor="password"
            >
              Re-type Password
            </label>{" "}
            <br></br>
            <input
              className="border border-black border-lg rounded-[10px] w-full p-2"
              type="password"
              placeholder="Re-type password here"
              required
              value={userPassword2}
              onChange={(e) => setUserPassword2(e.target.value)}
            />{" "}
            <br></br> <br></br>
          </div>

          {passwordMismatch ? (
            <p className="text-red-500 text-center">
              Passwords do not match. Please try again.
            </p>
          ) : null}
          {accountRegistered === "Email already exists" ? (
            <p className="text-red-500 text-center">
              Email already exists. Please use a different email.
            </p>
          ) : null}
          {accountRegistered === "User created successfully." ? (
            <p className="text-green-500 text-center">
              Account registered. Please login.
            </p>
          ) : null}

          <div className="flex justify-center mb-3">
            <button className="text-black hover:bg-[#160E3D] hover:text-[#F9BE60] px-[55px] text-center bg-[#F9BE60] rounded-full drop-shadow-lg text-[20px] font-Montserrat font-semibold">
              Create Account{" "}
            </button>
          </div>
          <div className="font-light text-center text-white font-Montserrat py-2 mb-3">
            <p className="text-center font-montserrat">
              {" "}
              Already have an account?{" "}
            </p>
            <Link className="underline hover:text-black" to="/">
              {" "}
              Login Here{" "}
            </Link>
          </div>
        </form>
        </div>
        </div>
        <div className="w-1/3 bg-[#160E3D] text-white flex flex-col items-center justify-center">
        <div className="w-1/2">
          <img src={logo} alt="logo" />
        </div>
        <p className="text-xs mt-4">2023 All Rights Reserved</p>
      </div>
    </div>

  )
};
export default SignUp;
