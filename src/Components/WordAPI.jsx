import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./wordAPI.css";
import { getStatistics } from "../Utils/getStatistics";
import { getRandomParagraph } from "../Utils/getRandomParagraph";

export default function WordAPI() {
  const [paragraph, setParagraph] = useState(getRandomParagraph());
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStart = () => {
    setTimerOn(true);
  };

  const handleReload = () => {
    setParagraph(getRandomParagraph());
    setTime(0);
    setTimerOn(false);
    inputRef.current.value = "";
  };

  const buttonHandler = () => {
    setTimerOn(false);
    const inputText = inputRef.current.value;
    const stats = getStatistics(inputText, paragraph, time);
    navigate("/results", { state: { stats } });
  };

  return (
    <>
      <motion.div
        animate={{ y: [500, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="word"
      >
        <div className="textHolder">
          <textarea
            className="fetchText"
            placeholder={paragraph}
            readOnly
            onFocus={handleStart}
          />
          <textarea className="fetchTextOverlay" ref={inputRef}></textarea>
          <button onClick={buttonHandler} className="accuracy">
            SUBMIT
          </button>
          <div onClick={handleReload} className="reload">
            RELOAD
          </div>
        </div>
      </motion.div>
    </>
  );
}
