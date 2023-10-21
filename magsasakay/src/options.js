import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import landmark from './img/location.jpg';
import route from './img/route.jpeg';
import option_bg from './img/option_bg.jpeg';


const Options = () => {
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(13, 112, 177, 0.7), rgba(140, 13, 240, 0.7)), url(${option_bg})`,
    };
    return ( 
        <>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path = '/'/>
                </Switch>
            </Router>
            <div
                style={backgroundStyle}
                className="bg-cover bg-no-repeat bg-center bg-fixed min-h-screen">
            <div className="mx-auto h-screen " >
                <div className="">
                    <br/>
                    <h1 className='text-white font-Montserrat mt-8 font-extrabold text-[55px] text-center'>
                        Select Option
                    </h1> <br/>
                    <br/> <br/>
                    <div className='mx-auto flex justify-center space-x-35'>
                        <div className='flex flex-col items-center'>
                            <div className=" font-Montserrat font-semibold text-[25px] text-center text-white 
                                px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                                bg-[#8C0DF0] bg-cover enlarge-on-hover hover:bg-opacity-100 transform hover:scale-110
                                hover:border-[#5AF0D5]  hover:text-[#5AF0D5]">
                                <Link>
                                <div className='flex justify-center'>
                                    <img className="w-64 h-40 object-cover rounded-3xl" src={landmark} alt="" />  
                                </div>
                                <span>Locate <br /> Destination</span>
                                </Link> 
                            </div> 
                        </div>
                        <br/> <br/> <br/> <br/>
                        <div className='flex flex-col items-center'>
                            <div className="font-Montserrat font-semibold text-[25px] text-center text-white 
                                px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                                bg-[#0D70B1] bg-cover enlarge-on-hover hover:bg-opacity-100 transform hover:scale-110
                                hover:border-[#5AF0D5] hover:text-[#5AF0D5]">
                           
                            <   Link> 
                            <div className='flex justify-center'>
                               <img className="w-64 h-40 object-cover rounded-3xl" src={route} alt="" />  
                            </div>
                            
                            <span className='text-center'>View <br />PUV Routes</span>
                            </Link> 
                            </div>
                        </div>
                         <br/> <br/> <br/> <br/>  
                    </div>
                    
                </div>
                <div>
                </div>
            </div>
            </div>
        </>
     );
}
 
export default Options;