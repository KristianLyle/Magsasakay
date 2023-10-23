import React from "react";
import FindRoute from "./FindRoute";
import ViewRoutes from "./ViewRoutes";
import "./index.css";
import { Router } from "express";

function App() {
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
        <Route exact path="/options">
          <Options />
        </Route>
        <Route exact path="/view-routes">
          <ViewRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
