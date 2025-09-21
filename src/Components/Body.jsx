import React from 'react'
import {motion} from "framer-motion"; 
import {useNavigate} from "react-router-dom";
import "./body.css"

export default function Body() {

  const navigate = useNavigate();

  const buttonHandler = ()=>
  {
    navigate("/game")
  }

  return (
    <>
        <motion.div animate={{y:[-100,0], opacity:[0,1]}} transition={{duration:1}} className="body">
            <div className="upperBody">
                <motion.div animate={{x:[-100,0], opacity:[0,1]}} transition={{duration:1}} className="description">
                    razerType is a<br/> Beginner Level React app of a<br/>Fun Type Speed Illustrator!
                    <div onClick={buttonHandler} className="start">
                       START
                    </div>
                </motion.div>
                <motion.div animate={{x:[100,0], opacity:[0,1]}} transition={{duration:1}} className="image">
                  <img src="Assets/razerType.svg" alt="" className="backdropImage" />
                </motion.div>
            </div>
            
            
        </motion.div>
    </>
  )
}
