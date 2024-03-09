import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import logo from "./img/logo.png";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(userEmail, userPassword);
    fetch("http://localhost:3001/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("loggedIn", true);

          history.push("/home"); // Redirect to home page
        } else {
          alert(data.error);
        }
      });
  }

  return (
    <div className="min-h-screen relative flex font-Montserrat">
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute w-[100%] h-screen bg-image1 bg-cover opacity-100"></div>
        <div className="absolute w-[100%] h-screen bg-gradient-to-t from-orange-500 to-cyan-500 opacity-60"></div>
        <div className="w-full max-w-md p-8 rounded-[37px] drop-shadow-2xl bg-[#7826D0] text-white">
          <h1 className="text-center text-4xl font-semibold mb-8">
            Login to Continue
          </h1>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              className="w-full py-2 px-3 border border-black rounded-[10px] text-black"
              type="email"
              placeholder="Enter email here"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              className="w-full py-2 px-3 border border-black rounded-[10px] text-black"
              type="password"
              placeholder="Enter password here"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div className="text-center mb-8">
            <p className="text-white text-sm">
              Don't have an account yet?{" "}
              <Link className="underline hover:text-black" to="/SignUp">
                Register Here!
              </Link>
            </p>
          </div>
          <div className="text-center">
            <button
              className="bg-[#F9BE60] text-2xl px-6 py-2 rounded-full font-semibold text-black hover:bg-[#160E3D] hover:text-[#F9BE60] drop-shadow-2xl"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-[#160E3D] text-white flex flex-col items-center justify-center">
        <div className="w-1/2">
          <img src={logo} alt="logo" />
        </div>
        <p className="text-xs mt-4">2023 All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Login;
