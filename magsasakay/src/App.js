import React from 'react';
import Maps from './Maps'; // Import your map component
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import './index.css';
import Login from './Login'
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login/>
          <Maps />
        </Route>
        <Route exact path='/signUp'>
          <SignUp/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;