import React, { useEffect } from "react";
import "./index.css";
import NavBar from "./navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import prof_bg from "./img/prof_bg.png";
import user from "./img/user.jpg";
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
   const leftPanelStyle = {
    position: "absolute",
    //top: 0,
    //left: 0,
    height: "100%",
    width: "33.33%",
    //backgroundColor: "lightblue",
    zIndex: 1,
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>

      <div className="relative bg-cover ">
        <div style={leftPanelStyle}
        className="relative z-11 top-0 left-0 h-full
                   phone:w-3/5
                    ">
          <ProfileCard
          className="relative z-12" />
        </div>
        <div
          className=" bg-cover bg-[#240750] bg-full bg-center min-h-screen relative z-12">      
          <br />
          <ProfileReviews
          className= ' '/>
        </div>
      </div>
    </>
  );
};

export default Profile;
