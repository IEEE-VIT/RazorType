import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import "./wordAPI.css";
import { getStatistics } from "../Utils/getStatistics";
import {
  PARAGRAPH_LENGTH,
  getRandomParagraph,
} from "../Utils/getRandomParagraph";

export default function WordAPI() {
  const [paragraph, setParagraph] = useState(getRandomParagraph()); // Initialize paragraph once
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState("");

  const handleAccuracy = () => {
    const { totalAccurateWords } = getStatistics(inputText, paragraph);
    const userAccuracy = Math.floor(
      (totalAccurateWords / PARAGRAPH_LENGTH) * 100
    );
    console.log(userAccuracy);
    return userAccuracy;
  };

  const navigate = useNavigate();

  const buttonHandler = () => {
    const userAccuracy = handleAccuracy();
    navigate("/results", { state: { userAccuracy } });
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      // Check for last word here
      const words = inputText.trim().split(" ");
      if (words.length >= PARAGRAPH_LENGTH) {
        buttonHandler();
      }
    }
  };

  useEffect(() => {
    console.log("WordAPI component mounted");
    return () => {
      console.log("WordAPI component unmounted");
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{ y: [500, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="word"
      >
        <div className="textHolder">
          <textarea className="fetchText" placeholder={paragraph} readOnly />
          <textarea
            className="fetchTextOverlay"
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button onClick={buttonHandler} className="accuracy">
            ACCURACY
          </button>
          <div className="reload">RELOAD</div>
        </div>
      </motion.div>
    </>
  );
}
