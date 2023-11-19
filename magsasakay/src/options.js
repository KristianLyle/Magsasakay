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
                className="bg-full">
            <div className="mx-auto h-screen " >
                <div className="">
                <div className=' text-white font-Montserrat bg-cover min-w-screen h-[300px] mt-0'>
               
                <h1 className='  mt-0 pl-4 text-center font-extrabold text-[50px]'>
                        Our Mission
                    </h1> <br/>
                    <div className="box-container p-2 text-left font-semibold text-[20px] overflow-y-auto whitespace-normal">
                        <p className='font-normal mx-[4px] max-h-[125px] '>
                        There is an informal saying among Ilonggos: It isn’t siopao if it isn’t Roberto’s. That’s right, Roberto’s siopao is so good that it might redefine what people know about the dish entirely. Their siopao comes in different sizes. But for the best value, buy their ‘Queen’ siopao. It is the biggest and the most packed out of all their siopao.
                        </p>
                    
                    </div>
            </div>
                    <br/>
                    <h1 className='text-white font-Montserrat mt-4 font-extrabold text-[85px] text-center'>
                        Select Option
                    </h1> <br/>
                    <br/> <br/>
                    <div className='mx-auto flex justify-center space-x-35'>
                        <div className='flex flex-col items-center'>
                            <div className=" font-Montserrat font-bold text-[35px] text-center text-white 
                                px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                                bg-[#8C0DF0] bg-cover enlarge-on-hover hover:bg-opacity-100 transform hover:scale-110
                                hover:border-[#5AF0D5]  hover:text-[#160E3D] glow">
                                <Link>
                                <div className='flex justify-center'>
                                    <img className="w-80 h-60 object-cover rounded-3xl" src={landmark} alt="" />  
                                </div>
                                <span>Locate <br /> Destination</span>
                                </Link> 
                            </div> 
                        </div>
                        <br/> <br/> <br/> <br/>
                        <div className='flex flex-col items-center'>
                            <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                                px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                                bg-[#0D70B1] bg-cover enlarge-on-hover hover:bg-opacity-100 transform hover:scale-110
                                hover:border-[#5AF0D5] hover:text-[#160E3D] glow">
                            <   Link> 
                            <div className='flex justify-center'>
                               <img className="w-80 h-60 object-cover rounded-3xl" src={route} alt="" />  
                            </div>
                            
                            <span>View <br />PUV Routes</span>
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