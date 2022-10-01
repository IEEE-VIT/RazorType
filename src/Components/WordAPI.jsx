import React from 'react'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react'
import "./wordAPI.css";

export default function WordAPI() {

  return (
    <>
    <motion.div animate={{y:[500,0],opacity:[0,1]}} transition={{duration:1}} className="word">
        <div className="textHolder">
            <textarea className="fetchText" placeholder='random text to be fetched from the json file' readOnly/>
            <textarea className='fetchTextOverlay'></textarea>
            <div className="reload">
                RELOAD
            </div>
        </div>
    </motion.div>
      
    </>
  )
}
