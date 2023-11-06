import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import resto_bg from './img/resto_bg.jpg';
import roberto from './img/roberto.png';
import tatoys from './img/tatoys.png';
import mamusa from './img/mamusa.png';

const Restaurants = () => {
  const backgroundStyle = {
    backgroundImage: `url(${resto_bg})`,
  };

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div
        style={backgroundStyle}
        className="bg-cover bg-center bg-fixed min-h-screen"
      >
        <div className="mx-auto h-screen">
          <div className=""> <br/>
            <h1 className='text-white font-Montserrat mt-4 text-center font-extrabold text-[40px]' style={{ margin: 0 }}>
                Popular Right Now
            </h1> <br/>
            <div className="mx-auto flex justify-center space-x-35">
              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                  px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                  bg-[#160E3D] bg-cover hover:border-[#5AF0D5] max-w-[350px] h-[500px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-60 object-cover rounded-3xl border-[2px] border-white" src={roberto} alt="" />
                  </div>
                  <span className='text-[25px] font-regular '>Roberto's Siopao</span>
                  <div className="box-container">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                      There is an informal saying among Ilonggos: It isn’t siopao if it isn’t Roberto’s. That’s right, Roberto’s siopao is so good that it might redefine what people know about the dish entirely. Their siopao comes in different sizes. But for the best value, buy their ‘Queen’ siopao. It is the biggest and the most packed out of all their siopao.
                    </p>
                    <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mr-[5px]">
                        Location
                    </button>
                    <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl">
                        View Reviews
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                  px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                  bg-[#160E3D] bg-cover hover:border-[#5AF0D5] max-w-[350px] h-[500px] ">
                  <div className='flex justify-center '>
                    <img className="w-80 h-60 object-cover rounded-3xl border-[2px] border-white" src={tatoys} alt="" />
                  </div>
                  <span className='text-[25px] font-regular'>Tatoy's Manokan</span>
                  <div className="box-container">
                    <p className='text-[12px] font-normal ml-[0px] text-left  max-h-[125px] overflow-y-auto'>
                    Situated on the beach, Tatoy’s Manok and Seafood possesses an undeniable charm that has instantly attracted Ilonggos since its establishment. And because it’s beside the sea, the restaurant has the benefit of hauling in the freshest catch of the day and turning them into mouthwatering, culinary masterpieces.Tatoy’s has the perfect recipe to be counted as one of the best restaurants in Iloilo.
                    </p>
                  </div>
                  <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mr-[5px]">
                        Location
                    </button>
                    <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl">
                        View Reviews
                    </button>
                </div>
              </div>

              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                  px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px]
                  bg-[#160E3D] bg-cover hover:border-[#5AF0D5] max-w-[350px] h-[500px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-60 object-cover rounded-3xl border-[2px] border-white" src={mamusa} alt="" />
                  </div>
                  <span className='text-[25px] font-regular'>Mamusa Art Bistro</span>
                  <div className="box-container">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                    For an eclectic dining space, Mamusa Art Bistro provides diners with an experience out of the ordinary, in a good and enriching way. Doubling as an art space, this restaurant makes use of its gorgeous setting by serving delectable food while enjoying contemporary art. And much like the works exhibited inside, most of their food and drinks are born from places of inspiration. Taste their crispy kare-kareng bagnet or their signature Mamusa blends for a stirring meal.
                    </p>
                    <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl mr-[5px]">
                        Location
                    </button>
                    <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] drop-shadow-2xl">
                        View Reviews
                    </button>
                  </div>
                </div>
              </div>

            </div> <br/> <br/>
                <Link to='restoViewMore' className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                                font-bold text-white hover:bg-white hover:text-[#160E3D] 
                                drop-shadow-2xl ml-[665px] font-Montserrat px-[50px]">
                        View More
                </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurants;
