import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { sideBarData } from "./sideBarData";
import logo from "./img/logo.png";

const NavBar = () => {
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);

  return (
    <>
      <div className="navbar bg-[#160E3D] h-[55px] justify-start items-center flex z-50">
        <Link
          to="#"
          className="menuBars ml-[10px] text-[25px] bg-[#7B00FF] rounded-[12px] px-[15px] py-[3px]"
        >
          <FaBars className="w-[30px]" onClick={showSideBar} />
        </Link>
        <img src={logo} alt="logo" className="w-[65px] ml-[1370px]"></img>
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
                <Link to={item.path}>
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
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
