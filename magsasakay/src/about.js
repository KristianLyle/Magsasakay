import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import aboutBg from './img/city.png';
import cityImg from './img/iloilo1.jpeg';
import cityImg2 from './img/location.jpg'
import cityImg3 from './img/ilonight.jpg'
import dev1 from './img/dev1.jpg';
import dev2 from './img/dev2.jpg';
import dev3 from './img/dev3.jpg';
import dev4 from './img/dev4.jpg';
import dev5 from './img/dev5.jpg'

const About = () => {
    const missionImages = [cityImg, cityImg2, cityImg3]; // Array of images for the carousel

    let missionIndex = 0; // Index for the current background image

    // Function to change background image
    const changeMissionBackground = () => {
        missionIndex = (missionIndex + 1) % missionImages.length;
        const missionContainer = document.getElementById('missionContainer');
        if (missionContainer) {
        missionContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(13, 112, 177, 1.7), rgba(0,0,0,0.75)), url(${missionImages[missionIndex]})`;
        }
    
       
    };

    // Auto-change background image after a certain interval
    setInterval(changeMissionBackground, 5000);
    const backgroundStyle = {
        
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(244, 156, 83, 1)), url(${aboutBg})`,
        backgroundSize: 'cover', // Ensures the image covers the entire container
        backgroundPosition: 'center', // Centers the background image
        height: '100vh', // Makes sure the background covers the entire viewport height

        
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
            className="bg-contain bg-full bg-center min-h-screen"
          >
        <div className="mx-auto h-screen">
          <div className="">
        <div className=''>
            <div 
            id="missionContainer" 
            className=' text-white font-Montserrat bg-cover min-w-screen h-[210px] py-2 mt-0' 
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(13, 112, 177, 1.7), rgba(0,0,0,0.75)), url(${cityImg})`}}>
               
                <h1 className='  mt-0 pl-4 text-center font-extrabold text-[50px]'>
                        Our Mission
                    </h1> 
                    <div className="box-container p-2 text-left font-semibold text-[18px] overflow-y-auto whitespace-normal">
                        <p className='font-normal mx-[4px] max-h-[125px] '>
                        To empower individuals and communities by providing a seamless and efficient route planning platform that simplifies their journeys, enhances their daily lives, and contributes to a more sustainable and connected world. We are committed to delivering accurate, accessible, and innovative route solutions that prioritize user convenience, safety, and environmental responsibility. Through our platform, we aim to inspire exploration, foster connections, and pave the way for a brighter, more accessible future.
                        </p>
                    
                    </div>
            </div>

            <hr />

        {/* <div className=' text-white font-Montserrat bg-cover min-w-screen  mt-0 bg-cityImg'>
                <h1 className='  mt-0 pl-4 text-center font-extrabold text-[50px]'>
                    Our Mission
                </h1>
                <div className="box-container p-2 text-left font-semibold text-[15px] overflow-y-auto whitespace-normal">
                    <p className='font-normal mx-[4px] max-h-[125px] '>
                    There is an informal saying among Ilonggos: It isn’t siopao if it isn’t Roberto’s. That’s right, Roberto’s siopao is so good that it might redefine what people know about the dish entirely. Their siopao comes in different sizes. But for the best value, buy their ‘Queen’ siopao. It is the biggest and the most packed out of all their siopao.
                    </p>
                </div>
                
        </div> */}
            
          
            <h1 className='text-white font-Montserrat mt-4 ml-10 text-left font-semibold text-[30px]'>
                About Us
            </h1> <br/>

            <div className="mx-auto flex justify-center space-x-0">
              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                    mx-8 rounded-3xl inline-block 
                  bg-[#0D70B1] bg-cover max-w-[400px] h-[400px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-40 object-cover rounded-t-3xl border-[2px]" src={dev1} alt="" />
                  </div>
                  <div className='bg-[#7826D0] rounded-b-3xl  border-[2px]'>
                  <span className='text-[15px] font-regular'>Kristian Lyle Sencil</span>
                  <p className='text-[10px] mb-2 text-white-500'>kbsencil1@up.edu.ph</p>
                  </div> 
                  <div className="box-container p-2 text-center">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                    Lyle Sencil excels as a Scrum Master, adeptly guiding teams through agile methodologies and enhancing collaboration information and ensure alignment on project goals. Lyle's commitment to promoting transparency empower teams to learn and grow. Lyle was a former mayor of Passi who have countless records of theft. 
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                    mx-8 rounded-3xl inline-block 
                  bg-[#0D70B1] bg-cover max-w-[400px] h-[400px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-40 object-cover rounded-t-3xl border-[2px]" src={dev2} alt="" />
                  </div>
                  <div className='bg-[#7826D0] rounded-b-3xl border-[2px]'>
                  <span className='text-[15px] font-regular'>Rainer Mayagma</span>
                  <p className='text-[10px] mb-2 text-white-500'>rtmayagma@up.edu.ph</p>
                  </div> 
                  <div className="box-container p-2 text-center">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                    Rainer Mayagma  a former inmate is a results-driven project manager known for his exceptional organizational skills and strategic thinking. With a proven track record of delivering complex projects on schedule and within budget, he is a reliable leader for any team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                    mx-8 rounded-3xl inline-block 
                  bg-[#0D70B1] bg-cover max-w-[400px] h-[400px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-40 object-cover rounded-t-3xl border-[2px]" src={dev3} alt="" />
                  </div>
                  <div className='bg-[#7826D0] rounded-b-3xl border-[2px]'>
                  <span className='text-[15px] font-regular'>John Luis Magtoto</span>
                  <p className='text-[10px] mb-2 text-white-500'>jfmagtoto@up.edu.ph</p>
                  </div> 
                  <div className="box-container p-2 text-center">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                    Luis Magtoto was a macho dancer but now a highly skilled developer known for his proficiency in various programming languages and a knack for tackling complex coding challenges. His dedication to clean, efficient code and strong problem-solving abilities make him a valuable asset.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                    mx-8 rounded-3xl inline-block 
                  bg-[#0D70B1] bg-cover max-w-[400px] h-[400px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-40 object-cover rounded-t-3xl border-[2px]" src={dev4} alt="" />
                  </div>
                  <div className='bg-[#7826D0] rounded-b-3xl border-[2px]'>
                  <span className='text-[15px] font-regular'>Kurt Matthew Amodia</span>
                  <p className='text-[10px] mb-2 text-white-500'>kaamodia@up.edu.ph</p>
                  </div> 
                  <div className="box-container p-2 text-center">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                    Kurt Amodia was once a pastor but now a seasoned software developer with a passion for crafting elegant and efficient solutions. 
                    Kurt's extensive experience in a variety of programming languages and technologies allows him to adapt seamlessly to diverse project requirements. 
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-container">
                <div className="font-Montserrat font-bold text-[35px] text-center text-white 
                    mx-8 rounded-3xl inline-block 
                  bg-[#0D70B1] bg-cover max-w-[400px] h-[400px]">
                  <div className='flex justify-center'>
                    <img className="w-80 h-40 object-cover rounded-t-3xl border-[2px]" src={dev5} alt="" />
                  </div>
                  <div className='bg-[#7826D0] rounded-b-3xl border-[2px]'>
                  <span className='text-[15px] font-regular'>Zyrex Djewel Ganit</span>
                  <p className='text-[10px] mb-2 text-white-500'>zfganit@up.edu.ph</p>
                  </div> 
                  <div className="box-container p-2 text-center">
                    <p className='text-[12px] font-normal ml-[0px] text-left max-h-[125px] overflow-y-auto'>
                    Zyrex Ganit a former R-rated movie star found love in programming and developing software. He is a relentless worker who prioritizes 
                    the state of the project above anything else. His peers also comment that he has 
                    a very uplifting spirit brought about by his former career
                    </p>
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

export default About;
