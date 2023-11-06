import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import carlos from './img/carlos.png';
import moloCafe from './img/moloCafe.jpg';
import muelle from './img/muelle.jpg';

const ViewMore = () => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(123, 0, 255, 0.7), rgba(240, 143, 90, 0.7))`,
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
        className="bg-full"
      >
        <div className="mx-auto min-h-screen">
          <div className=""> <br/>
            <h1 className='text-white font-Montserrat mt-4 text-center font-extrabold text-[40px]' style={{ margin: 0 }}>
                More Restaurants
            </h1> <br/>
            <div className="flex-col">
              <div className="flex-container py-4">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                  px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px] 
                  bg-[#FFF1F1] bg-cover hover:border-[#5AF0D5] max-w-none h-[200px]">
                <div className='flex text-black'>
                  <div className='w-1/2flex justify-center'>
                    <div className="w-40 h-20 relative">
                        <div className="absolute inset-0">
                             <img className=" object-cover rounded-3xl border-[2px] border-white" src={moloCafe} alt="" />
                        </div>
                    </div>
                   
                  </div> 
                  <div className='text-start pl-6'>
                    <span className='text-[25px] font-regular text-center'>Molo Mansion Cafe</span>
                    <div className="box-container">
                        <p className='text-[15px] font-normal ml-[0px] text-left overflow-y'>
                        The Molo Mansion Café, an al fresco dining place at the back of Molo Mansion in Iloilo first opened in 2015 as Table Matters, serving delicious and unique concoctions of refreshing drinks and desserts made with fresh coconut, dragon fruit, and a flower called Blue Ternate.
                        </p> 
                  </div>
                  <div className='flex justify-end mt-4'>
                        <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]">
                            Location
                        </button>
                        <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md">
                            View Reviews
                        </button>
                  </div>
                   
                    </div>
                  </div>
                </div>
              </div>

               <div className="flex-container py-4">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                  px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px] 
                  bg-[#FFF1F1] bg-cover hover:border-[#5AF0D5] max-w-none h-[200px]">
                <div className='flex text-black'>
                  <div className='w-1/2flex justify-center'>
                  <div className="w-40 h-20 relative">
                        <div className="absolute inset-0">
                             <img className=" object-cover rounded-3xl border-[2px] border-white" src={muelle} alt="" />
                        </div>
                    </div>
                  </div> 
                  <div className='text-start pl-6'>
                    <span className='text-[25px] font-regular text-center'>Muelle Deli and Restaurant</span>
                    <div className="box-container">
                        <p className='text-[15px] font-normal ml-[0px] text-left overflow-y'>
                        Muelle Deli and Restaurant, located in Iloilo City, offers a fusion of international and local cuisine. The establishment boasts a romantic ambiance, perfect for a date night or intimate gathering with friends. The interior design is chic and modern, with both indoor and outdoor seating options overlooking the scenic Iloilo River. Prices are on the higher side, but the quality of food, service, and atmosphere justifies the cost.
                        </p> 
                  </div>
                  <div className='flex justify-end mt-4'>
                        <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]">
                            Location
                        </button>
                        <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md">
                            View Reviews
                        </button>
                  </div>
                   
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-container py-4">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                  px-3 py-3 mx-16 rounded-3xl inline-block border-white border-[2px] 
                  bg-[#FFF1F1] bg-cover hover:border-[#5AF0D5] max-w-none h-[200px]">
                <div className='flex text-black'>
                  <div className='w-1/2flex justify-center'>
                  <div className="w-40 h-20 relative">
                        <div className="absolute inset-0">
                             <img className=" object-cover rounded-3xl border-[2px] border-white" src={carlos} alt="" />
                        </div>
                    </div>
                  </div> 
                  <div className='text-start pl-6'>
                    <span className='text-[25px] font-regular text-center'>Carlos Bakeshop</span>
                    <div className="box-container">
                        <p className='text-[15px] font-normal ml-[0px] text-left overflow-y'>
                        Established in 1987, Carlo’s Bakeshop started as a cake supplier. As the market grew, it opened a commissary to manufacture and distribute packaged breads, pastries, cakes and pasalubong items to more customers and dealers.  Carlo’s Bakery Café offers pastas, sandwiches, merienda items and a variety of dishes that suit the needs of Ilonggos.
                        </p> 
                  </div>
                  <div className='flex justify-end mt-4'>
                        <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md mr-[5px]">
                            Location
                        </button>
                        <button className="bg-[#EE7200] text-[15px] px-6 py-2 rounded-full font-semibold text-white hover:bg-white hover:text-[#160E3D] shadow-md">
                            View Reviews
                        </button>
                  </div>
                   
                    </div>
                  </div>
                </div>
              </div>

              

            </div> <br/> <br/>
                
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewMore;
