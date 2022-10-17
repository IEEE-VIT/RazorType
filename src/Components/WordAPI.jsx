import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './wordAPI.css';

const paragraphs = require('../Data/paragraphs.json');
const PARAGRAPH_LENGTH = 30;
const getRandomParagraph = () => {
  const maxIndex = paragraphs.length;
  return Array(PARAGRAPH_LENGTH)
    .fill('')
    .map(() => {
      const i = Math.floor(Math.random() * maxIndex);
      return paragraphs[i];
    })
    .join(' ');
};

export default function WordAPI() {
  const paragraph = getRandomParagraph();

  return (
    <>
    <motion.div animate={{y:[500,0],opacity:[0,1]}} transition={{duration:1}} className="word">
        <div className="textHolder">
            <textarea className="fetchText" placeholder={paragraph} readOnly/>
            <textarea className='fetchTextOverlay'></textarea>
            <div className="reload">
                RELOAD
            </div>
        </div>
    </motion.div>
      
    </>
  )
}
