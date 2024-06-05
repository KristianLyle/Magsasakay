import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import cityImg from "./img/iloilo1.jpeg";
import cityImg2 from "./img/location.jpg";
import cityImg3 from "./img/ilonight.jpg";
import dev1 from "./img/dev1.jpg";
import dev2 from "./img/dev2.jpg";
import dev3 from "./img/dev3.jpg";
import dev4 from "./img/dev4.jpg";
import dev5 from "./img/dev5.jpg";

const About = () => {
  const history = useHistory();
  useEffect(() => {
    const status = window.localStorage.getItem("loggedIn");
    if (status === "false") {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  const missionImages = [cityImg, cityImg2, cityImg3];
  let missionIndex = 0;

  const changeMissionBackground = () => {
    missionIndex = (missionIndex + 1) % missionImages.length;
    const missionContainer = document.getElementById("missionImage");
    if (missionContainer) {
      missionContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(70, 30, 150, 0), rgba(0,0,0,0)), url(${missionImages[missionIndex]})`;
    }
  };

  useEffect(() => {
    const interval = setInterval(changeMissionBackground, 5000);
    return () => clearInterval(interval);
  }, []);

  const backgroundRef = useRef(null);

  // Calculate the height of the background container
  useEffect(() => {
    if (backgroundRef.current) {
      const height = backgroundRef.current.scrollHeight;
      backgroundRef.current.style.minHeight = `100vh`; // Ensure background covers the viewport height
    }
  }, []);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
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
        ref={backgroundRef}
        style={{
          backgroundColor: "#461E96",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure background covers the viewport height
          maxWidth: "230vh"
        }}
        className="bg-contain bg-full bg-center min-h-screen flex flex-col"
      >
        <div>
        <div
            id="missionContainer"
            className="text-white font-Montserrat bg-cover min-w-screen md:h-[300px] h-[400px] py-2 mt-0 flex flex-col md:flex-row rounded-xl"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(70, 30, 150, 0), rgba(0,0,0,0))`,
            }}
          >

          <div className="md:w-1/2 p-4 md:p-10 md:pl-10 flex flex-col justify-center">
            <h1 className="pt-10 text-left font-extrabold md:text-[50px] text-[30px]">
                  Our Mission
            </h1>
            <div className="box-container p-2 text-left font-semibold text-[18px] whitespace-normal">
              <p
                id="missionContent"
                className={`font-normal mx-[4px] ${
                  expanded ? "overflow-y-auto" : "overflow-y-hidden"
                } max-h-[${
                  expanded ? "none" : "50px"
                }] text-base md:text-[15px] lg:text-l`}
              >
                To empower individuals and communities by providing a seamless and efficient route planning platform that simplifies their journeys, enhances their daily lives, and contributes to a more sustainable and connected world. We are committed to delivering accurate, accessible, and innovative route solutions that prioritize user convenience, safety, and environmental responsibility. Through our platform, we aim to inspire exploration, foster connections, and pave the way for a brighter, more accessible future.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <div
              id="missionImage"
              className="w-full h-full bg-cover bg-center mr-8"
            ></div>
          </div>
        </div>


          <h1 className="text-white font-Montserrat font-bold ml-10 text-left md:text-[33px] text-[20px] mt-10 md:mt-20">
            About Us
          </h1>
          <p className="text-white font-Montserrat p-4 ml-6 text-left font-normal md:text-l text-[15px]">
            Our commute app is driven by a dedicated team. Kristian Lyle
            Sencil excels as our Scrum Master, guiding agile practices. Rainer
            Mayagma ensures timely and budget-friendly project delivery. John
            Luis Magtoto tackles coding challenges with skill, while Kurt
            Matthew Amodia crafts elegant software solutions. Zyrex Djewel
            Ganit, known for his relentless work ethic, brings an uplifting
            spirit to the team. Together, we simplify journeys and create a
            more connected world.
          </p>

          <div className="p-4"></div>

          {/* Developer Profile Containers */}
          <div className="flex flex-wrap justify-center space-y-5px space-x-4 md:mt-0">
            <DeveloperProfile
              src={dev1}
              name="Kristian Lyle Sencil"
              role="Scrum Master"
              email="kbsencil1@up.edu.ph"
            />
            <DeveloperProfile
              src={dev2}
              name="Rainer Mayagma"
              role="Project Manager"
              email="rtmayagma@up.edu.ph"
            />
            <DeveloperProfile
              src={dev3}
              name="John Luis Magtoto"
              role="Full Stack Developer"
              email="jfm
              agtoto@up.edu.ph"
              />
              <DeveloperProfile
                src={dev4}
                name="Kurt Matthew Amodia"
                role="Back-end Developer"
                email="kaamodia@up.edu.ph"
              />
              <DeveloperProfile
                src={dev5}
                name="Zyrex Djewel Ganit"
                role="Front-end Developer"
                email="zfganit@up.edu.ph"
              />
            </div>
  
            <br />
            <br />
          </div>
        </div>
      </>
    );
  };
  
  const DeveloperProfile = ({ src, name, role, email }) => (
    <div className="flex-container mb-4 md:mb-0 flex-grow max-w-sm">
      <div className="font-Montserrat font-bold text-[20px] text-center text-white mx-4 md:mx-8 rounded-3xl inline-block bg-cover w-full h-[300px] relative">
        <div className="flex justify-center">
          <div className="w-32 h-32 overflow-hidden rounded-full border-[1px] mt-6 mx-auto">
            <img className="w-full h-full object-cover" src={src} alt="" />
          </div>
        </div>
        <p className="md:text-[20px] text-[15px] mt-4 font-regular">{name}</p>
        <p className="md:text-[15px] text-[12px] mt-2 text-white-500">{role}</p>
        <p className="md:text-[15px] text-[12px] mb-4 text-white-500 font-normal">{email}</p>
      </div>
    </div>
  );
  
  export default About;
  