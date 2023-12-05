import React from 'react';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import prof_bg from './img/prof_bg.png';
import user from './img/user.jpg';
import ProfileCard from './profCard';
import ProfileReviews from './profRevCard';

const Profile = () => {
  const backgroundStyle = {
    backgroundImage: `url(${prof_bg})`,
  };

  const leftPanelStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '33.33%',
    backgroundColor: 'lightblue', 
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
      <div className="relative">
        <div style={leftPanelStyle}>
            <ProfileCard/>
        </div>
        <div style={backgroundStyle} className="bg-contain bg-full bg-center min-h-screen"> <br/>
          <ProfileReviews/>
        </div>
      </div>
    </>
  );
};

export default Profile;
