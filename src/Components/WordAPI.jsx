import React from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import "./wordAPI.css";
import { getStatistics } from "../Utils/getStatistics";
import {
  PARAGRAPH_LENGTH,
  getRandomParagraph,
} from "../Utils/getRandomParagraph";

export default function WordAPI() {
  const paragraph = getRandomParagraph();
  const inputRef = useRef(null);

  const handleAccuracy = () => {
    const inputText = inputRef.current.value;
    const { totalAccurateWords } = getStatistics(inputText, paragraph);
    const userAccuracy = Math.floor(
      (totalAccurateWords / PARAGRAPH_LENGTH) * 100
    );
    console.log(userAccuracy);
  };

  return (
    <>
      <motion.div
        animate={{ y: [500, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="word"
      >
        <div className="textHolder">
          <textarea className="fetchText" placeholder={paragraph} readOnly />
          <textarea className="fetchTextOverlay" ref={inputRef}></textarea>
          <button onClick={handleAccuracy} className="accuracy">
            ACCURACY
          </button>
          <div className="reload">RELOAD</div>
        </div>
      </motion.div>
    </>
  );
}
