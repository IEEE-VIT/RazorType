import React, { useState } from 'react'
import { motion } from 'framer-motion'
import "./navbar.css"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const menuAnimation=()=>
    {
        setIsMenuOpen(!isMenuOpen);
    }

    const buttonHandler=()=>
    {
        navigate("/")
    }

    const ieeeHandler = () => {
        window.open("https://www.ieeevit.org/", "_blank");
      };
      

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
                <img src="Assets/ieee logo 3.png" alt="" className="ieee" onClick={ieeeHandler} />
            </div>
        </motion.div>
    </>
  )
}
