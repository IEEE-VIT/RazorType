import React from 'react'
import { motion } from 'framer-motion'
import "./navbar.css"
import { Navigate, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();
    
    const menuAnimation=()=>
    {
        document.getElementsByClassName("line1").style.transform="rotate(45deg)";
        document.getElementsByClassName("line3").style.transform="rotate(-45deg)";
        document.getElementsByClassName("line2").style.opacity="0";
    }

    const buttonHandler=()=>
    {
        navigate("/")
    }

  return (
    <>
        <motion.div animate={{y:[-100,0],opacity:[0,1]}} transition={{duration:1}} className="navbar">
            <div onClick={menuAnimation} className='menuTrigger'>
                <img src="Assets/razerTypeLogo.svg" alt="" className="logo" />
            </div>
            <div onClick={buttonHandler} className="navHeading">   
                razerType
            </div>  
            <div className="ieeeLogo">
                <img src="Assets/ieee logo 3.png" alt="" className="ieee" />
            </div>
        </motion.div>
    </>
  )
}
