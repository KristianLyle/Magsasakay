import {useState} from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { sideBarData } from './sideBarData';

const NavBar = () => {
    const [sideBar,setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sideBar);


    return ( 
        <>
            <div className='navbar bg-[#160E3D] h-[40px] justify-start items-center flex'>
                <Link to="#" className="menuBars ml-[32pxz] text-[32px] bg-none"> 
                    <FaBars onClick={showSideBar}/>
                </Link>
            </div>
            <nav className = {sideBar ? 'navMenu active' : 'navMenu'}>
                <ul className='navMenu-items w-[100%]' onClick={showSideBar}>
                    <li className="navBar-toggle bg-[#160E3D] w-[100%] h-[80px] flex justify-start items-center">
                        <Link to ="#" className="menuBars ml-[32pxz] text-[32px] bg-none">
                            <AiOutlineClose/>
                        </Link>
                    </li>
                    {sideBarData.map((item,index) => {
                        return (
                           <li key={index} className = {item.cName}> 
                                <Link to={item.path}>
                                    <span className='ml-[16px]'> {item.title} </span>
                                </Link>
                           </li>
                        );
                    })}
                </ul>
            </nav>
        </>
     );
}

export default NavBar;