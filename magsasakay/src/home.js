import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';

const Home = () => {
    return ( 
        <>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path = '/'/>
                </Switch>
            </Router>
        </>
     );
}

export default Home;