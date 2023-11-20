import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./home";
import FindRoute from "./FindRoute";
import ViewRoutes from "./ViewRoutes";
import Options from "./options";
import Restaurants from "./restaurants";
import ViewMore from "./restoViewMore";
import RestoReviews from "./resto_review";
import About from "./about";

function App() {
  useEffect(() => {
    // Set the title when the component mounts
    document.title = "Magsasakay";
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/routes">
          <Options />
        </Route>
        <Route exact path="/view-routes">
          <ViewRoutes />
        </Route>
        <Route exact path="/find-routes">
          <FindRoute />
        </Route>
        <Route exact path="/restaurants">
          <Restaurants />
        </Route>
        <Route exact path="/restoViewMore">
          <ViewMore />
        </Route>
        <Route exact path="/resto_review/:restaurantName">
          <RestoReviews />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
