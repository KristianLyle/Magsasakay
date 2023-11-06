import React from 'react';
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import './index.css';
import Login from './Login'
import SignUp from './SignUp';
import Home from './home';
import Options from './options';
import Restaurants from './restaurants'
import ViewMore from './restoViewMore';


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
        <Route exact path= '/home'>
          <Home/>
        </Route>
        <Route exact path='/options'>
          <Options/>
        </Route>
        <Route exact path ='/restaurants'>
          <Restaurants/>
        </Route>
        <Route exact path ='/restoViewMore'>
          <ViewMore/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
