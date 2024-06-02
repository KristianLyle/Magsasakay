import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { sideBarData } from "./sideBarData";
import logo from "./img/logo.png";
import DeleteConfirmation from "./deleteConfirmation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMap, faArrowLeft,faSignOut} from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
  const history = useHistory();
  const [sideBar, setSideBar] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmDLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.setItem("loggedIn", false);
    history.push("/");
    window.location.reload();
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
    window.location.reload();
  };

  const showSideBar = () => setSideBar(!sideBar);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleClick = (path) => {
    history.push(path);
    window.location.reload();
  };

  return (
    <>
      <div className="navbar bg-[#160E3D] h-[55px] flex items-center sm:justify-start lg:justify-center z-50 ">
        <Link
          to="#"
          className="menuBars ml-[10px] text-[25px] bg-[#7B00FF] rounded-[12px] px-[15px] py-[3px] hover:bg-[#1a83ff] lg:hidden"
        >
          <FaBars className="w-[30px]" onClick={showSideBar} />
        </Link>

        <div className="largeScreen text-white justify-center ml-[30px] hidden lg:flex font-semibold ">
          <Link to="/home" onClick={() => handleClick("/home")} className="inline-block mr-4 hover:text-[#EE7200]"> Home </Link>
          <Link to="/routes" onClick={() => handleClick("/routes")} className="inline-block mr-4 hover:text-[#EE7200]"> Routes </Link>
          <Link to="/restaurants" onClick={() => handleClick("/restaurants")} className="inline-block mr-4 hover:text-[#EE7200]"> Restaurants </Link>
          <Link to="/profile" onClick={() => handleClick("/profile")} className="inline-block mr-4 hover:text-[#EE7200]"> Profile </Link>
          <Link to="/about" onClick={() => handleClick("/about")} className="inline-block mr-4 hover:text-[#EE7200]"> About </Link>
        </div>
        
        <div className="flex text-white ml-auto hidden lg:flex font-semibold">
          <button onClick={handleLogout} className="inline-block mr-4 hover:text-[#EE7200] hover:text-red-600"> Log Out <FontAwesomeIcon icon={faSignOut} className="mr-5" /> </button>
        </div>
      </div>

      <nav className={sideBar ? "navMenu active" : "navMenu"}>
        <ul className="navMenu-items w-[100%]" onClick={showSideBar}>
          <li className="navBar-toggle bg-[#160E3D] w-[100%] h-[80px] flex justify-start items-center">
            <Link to="#" className="menuBars ml-[32pxz] text-[32px] bg-none">
              <AiOutlineClose className="text-white ml-[15px]" />
            </Link>
          </li>
          {sideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} onClick={() => handleClick(item.path)}>
                  <span className="ml-[16px] items-center"> {item.title} </span>
                </Link>
              </li>
            );
          })}
          <br />
          <img
            src={logo}
            alt="logo"
            className="items-center w-[25 0px] ml-[0.098px]"
          ></img>
          <div className="ml-[130px] mt-[115px]">
            <button
              onClick={handleLogout}
              className="bg-[#EE7200] font-Montserrat rounded-full py-2 font-bold text-white hover:bg-[#1a83ff] drop-shadow-2xl px-[25px] max-w-[200px]"
            >
              Logout{" "}
            </button>

            {showConfirmation && (
              <DeleteConfirmation
                message="Are you sure you want to logout?"
                onConfirm={handleConfirmDLogout}
                onCancel={handleCancelLogout}
              />
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
