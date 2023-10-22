import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import about from './img/about.png';
import profile from './img/profile.png';
import routes from './img/routes.png';

const Home = () => {
    return ( 
        <>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path = '/'/>
                </Switch>
            </Router>
            <div className='bg-home_bg bg-no-repeat bg-cover'>
            <div className="container h-screen w-[150%]">
                <div className="">
                    <br/>
                    <h1 className='text-white font-Montserrat font-extrabold text-[55px] ml-[10px]'>
                        Welcome to Magsasakay!
                    </h1> <br/>
                    <p className='text-white font-Montserrat font-regular text-[20px] ml-[10px]'>
                    Discover seamless public transportation options to your destination 
                    and explore <br/> top-rated traveler-recommended restaurants in the city. 
                    Plan your journey effortlessly, <br/> read honest reviews.Your guide to travel 
                    and dining adventures. Start exploring now!
                    </p> <br/> <br/> <br/>

                    <div className="font-Montserrat font-semibold text-[50px] text-center text-white 
                        px-10 py-2 bg-red-50 ml-[100px] rounded-full inline-block border-white border-[2px]
                        bg-wte_bg bg-cover">
                        <Link>Where to eat in Iloilo</Link> 
                    </div> <br/> <br/> <br/> <br/>

                    <ul className='grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))]
                     text-white font-Montserrat text-center items-center ml-[100px] gap-x-[50px]'>
                        <li className='w-[175px] text-[35px] flex flex-col'>
                            <Link className='flex flex-col'>
                                <img src={about} alt='about'/>
                                <span>About</span>
                            </Link>
                        </li>
                        <br/>
                        <li className='w-[175px] text-[35px] flex flex-col'>
                            <Link className='flex flex-col'>
                                <img src={profile} alt='profile'/>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <br/>
                        <li className='w-[175px] text-[35px] flex flex-col'>
                            <Link className='flex flex-col' to='/options'>
                                <img src={routes} alt='routes'/>
                                <span>Routes</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                </div>
            </div>
            </div>
        </>
     );
}
 
export default Home;