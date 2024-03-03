import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import NavBar from './navbar';
import cityImg from './img/iloilo1.jpeg';
import cityImg2 from './img/location.jpg'
import cityImg3 from './img/ilonight.jpg'
import dev1 from './img/dev1.jpg';
import dev2 from './img/dev2.jpg';
import dev3 from './img/dev3.jpg';
import dev4 from './img/dev4.jpg';
import dev5 from './img/dev5.jpg';

const About = () => {
    const missionImages = [cityImg, cityImg2, cityImg3];
    let missionIndex = 0;

    const changeMissionBackground = () => {
        missionIndex = (missionIndex + 1) % missionImages.length;
        const missionContainer = document.getElementById('missionContainer');
        if (missionContainer) {
            missionContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(244, 156, 83, 0.05), rgba(0,0,0,0.75)), url(${missionImages[missionIndex]})`;
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
                    backgroundImage: `linear-gradient(to top, rgba(244, 156, 83, 0.5), rgba(13, 112, 177, 1.7)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh', // Ensure background covers the viewport height
                }}
                className="bg-contain bg-full bg-center min-h-screen flex flex-col"
            >
                <div>
                    <div
                        id="missionContainer"
                        className="text-white font-Montserrat bg-cover min-w-screen h-[350px] py-2 mt-0"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(13, 112, 177, 1.7), rgba(0,0,0,0.75)), url(${cityImg})`
                        }}
                    >
                        <div className="absolute top-40 left-0 right-0">
                            <h1 className="mt-130 pt-100 pl-4 text-left font-extrabold text-[50px]">Our Mission</h1>
                            <div className="box-container p-2 text-left font-semibold text-[18px] whitespace-normal">
                                <p
                                    id="missionContent"
                                    className={`font-normal mx-[4px] ${
                                        expanded ? 'overflow-y-auto' : 'overflow-y-hidden'
                                        } max-h-[${expanded ? 'none' : '125px'}] text-base md:text-lg lg:text-xl`}
                                >
                                    To empower individuals and communities by providing a seamless and efficient route planning platform that simplifies their journeys, enhances their daily lives, and contributes to a more sustainable and connected world. We are committed to delivering accurate, accessible, and innovative route solutions that prioritize user convenience, safety, and environmental responsibility. Through our platform, we aim to inspire exploration, foster connections, and pave the way for a brighter, more accessible future.
                                </p>
                                <button onClick={toggleExpand} className="text-blue-400 ml-2 mt-2">{expanded ? 'See Less' : 'See More'}</button>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <h1 className="text-white font-Montserrat font-bold mt-8 md:mt-4 ml-10 text-left text-[33px]">About Us</h1>
                    <p className="text-white font-Montserrat p-4 ml-6 text-left font-normal text-base md:text-lg lg:text-xl">
                        At our commute app, you'll find a team of dedicated individuals driving innovation and excellence. Kristian Lyle Sencil excels as a Scrum Master, guiding teams through agile methodologies and fostering collaboration. Rainer Mayagma, a results-driven project manager, ensures projects are delivered on time and within budget with his exceptional organizational skills. John Luis Magtoto, a highly skilled developer, tackles coding challenges with finesse, delivering clean and efficient solutions. Kurt Matthew Amodia brings a passion for crafting elegant software solutions, adapting seamlessly to diverse project requirements. Zyrex Djewel Ganit, known for his relentless work ethic, prioritizes project success above all else, infusing the team with his uplifting spirit. Together, we're committed to simplifying journeys and creating a more connected world through our commute app.
                    </p>

                    <div className="p-4"></div>

                    {/* Developer Profile Containers */}
                    <div className="flex flex-wrap justify-center space-y-0 space-x-0 mt-8 md:mt-0">
                        <DeveloperProfile src={dev1} name="Kristian Lyle Sencil" role="Scrum Master" email="kbsencil1@up.edu.ph" />
                        <DeveloperProfile src={dev2} name="Rayner Mayagma" role="Project Manager" email="rtmayagma@up.edu.ph" />
                        <DeveloperProfile src={dev3} name="John Luis Magtoto" role="Full Stack Developer" email="jfmagtoto@up.edu.ph" />
                        <DeveloperProfile src={dev4} name="Kurt Matthew Amodia" role="Back-end Developer" email="kaamodia@up.edu.ph" />
                        <DeveloperProfile src={dev5} name="Zyrex Djewel Ganit" role="Front-end Developer" email="zfganit@up.edu.ph" />
                    </div>
                    <br /><br />
                </div>
            </div>
        </>
    );
};

const DeveloperProfile = ({ src, name, role, email }) => (
    <div className="flex-container mb-4 md:mb-0 flex-grow">
        <div className="font-Montserrat font-bold text-[35px] text-center text-white mx-4 md:mx-8 rounded-3xl inline-block bg-cover w-full md:max-w-[400px] h-[200px] relative">
            <div className="flex justify-center">
                <div className="w-40 h-40 overflow-hidden rounded-full border-[1px] mx-auto">
                    <img className="w-full h-full object-cover" src={src} alt="" />
                </div>
            </div>
            <span className="text-[20px] font-regular">{name}</span>
            <p className="text-[15px] mt-2 text-white-500">{role}</p>
            <p className="text-[15px] mb-2 text-white-500 font-normal">{email}</p>
        </div>
    </div>
);

export default About;
