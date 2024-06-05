import React, { useEffect } from "react";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import ProfileCard from "./profCard";
import ProfileReviews from "./profRevCard";

const Profile = () => {
  const history = useHistory();

  useEffect(() => {
    const status = window.localStorage.getItem("loggedIn");
    if (status === "false") {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>

      <div className="relative bg-cover min-h-screen bg-[#240750] flex flex-col md:flex-row">
  <div className="md:w-1/3 flex md:justify-start p-4 md:p-0">
    <ProfileCard className="z-12" />
  </div>
  <div className="md:w-2/3 flex justify-center p-4 md:p-0 md:right-[-5px] md:min-h-screen
   md:bg-cover md:bg-full md:bg-center md:relative z-12">
    <ProfileReviews className="relative z-12 bg-cover bg-[#240750] bg-full bg-center left-[-50px] md:left-0" />
  </div>
</div>

    </>
  );
};

export default Profile;
