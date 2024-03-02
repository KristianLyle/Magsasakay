import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { sideBarData } from "./sideBarData";
import logo from "./img/logo.png";

const NavBar = () => {
  const history = useHistory();
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);

  const handleClick = (path) => {
    history.push(path);
    window.location.reload();
  };

  return (
    <>
      <div className="navbar bg-[#160E3D] h-[55px] justify-start items-center flex z-50">
        <Link
          to="#"
          className="menuBars ml-[10px] text-[25px] bg-[#7B00FF] rounded-[12px] px-[15px] py-[3px]"
        >
          <FaBars className="w-[30px]" onClick={showSideBar} />
        </Link>
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
          <div className= 'ml-[130px] mt-[115px]'>
            <button className='bg-[#EE7200] font-Montserrat rounded-full py-2 font-bold text-white hover:bg-[#1a83ff] drop-shadow-2xl px-[25px] max-w-[200px]'> 
            Logout </button>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
