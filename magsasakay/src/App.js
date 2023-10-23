import React from 'react';
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import './index.css';
import Login from './Login'
import SignUp from './SignUp';
import Home from './home';
import MapComponent from './Maps';
import Options from './options';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login/>
        </Route>
        <Route exact path='/signUp'>
          <SignUp/>
        </Route>
        <Route exact path='/home'>
          <Home/>
        </Route>
        <Route exact path='/options'>
          <Options/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
