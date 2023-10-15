import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Axios from 'axios';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPassword2, setUserPassword2] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState('');

  const HandleSignUp = (e) => {
    e.preventDefault();

    if (userPassword === userPassword2) {
      setPasswordMismatch(false); // Passwords match, set to false
      const user = { userName, userEmail, userPassword };

      // Make an Axios POST request to your server to register the user
      Axios.post('http://localhost:8000/register', {
        email: user.userEmail,
        username: user.userName,
        password: user.userPassword,
      })
        .then((response) => {
          if (response.data.message) {
            setRegistrationStatus(response.data.message);
          } else {
            setRegistrationStatus('Account registered');
          }
        })
        .catch((error) => {
          // Handle errors if registration fails
          setRegistrationStatus('Error during registration');
          console.error(error);
        });
    } else {
      setPasswordMismatch(true); // Passwords don't match, set to true
    }
  };

  return (
    <div>
      <div className="container">
        <h2 className="signUp">Sign Up</h2>
        <form className="loginForm" onSubmit={HandleSignUp}>
          <label className="text-left" htmlFor="username">
            Username
          </label>
          <br></br>
          <input
            className="border border-black p-1 border-lg"
            type="text"
            placeholder="Enter username here"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br></br>
          <label className="text-left" htmlFor="email">
            Email
          </label>
          <br></br>
          <input
            className="border border-black p-1 border-lg"
            type="email"
            placeholder="Enter email here"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            className="border border-black p-1 border-lg pb-1"
            type="password"
            placeholder="Enter password here"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <br></br>
          <label htmlFor="password">Re-type Password</label>
          <br></br>
          <input
            className="border border-black p-1 border-lg pb-1"
            type="password"
            placeholder="Re-type password here"
            required
            value={userPassword2}
            onChange={(e) => setUserPassword2(e.target.value)}
          />
          <br></br>
          <br></br>
          {passwordMismatch ? (
            <p className="text-red-500">Passwords do not match. Please try again.</p>
          ) : (
            <p>{registrationStatus}</p>
          )}
          <br></br>
          <br></br>
          <button className="text-center rounded-full bg-red-500 px-5">Sign Up</button>
          <br></br>
          <div className="createAccount">
            <p>Already have an account? </p>
            <Link className="underline" to="Login">
              Login
            </Link>
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
