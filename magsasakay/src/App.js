import React from 'react';
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import './index.css';
import Login from './Login'
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/signUp'>
          <SignUp/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
