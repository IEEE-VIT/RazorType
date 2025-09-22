import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./wordAPI.css";
import { getStatistics } from "../Utils/getStatistics";
import { getRandomParagraph } from "../Utils/getRandomParagraph";
import { useLocation } from "react-router-dom";

export default function WordAPI() {
  const location = useLocation();
  const initialParagraph = location.state && location.state.paragraph ? location.state.paragraph : getRandomParagraph();
  const [paragraph, setParagraph] = useState(initialParagraph);
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
    // Pass the paragraph to results for retry
    const stats = getStatistics(inputText, paragraph, time);
    stats.paragraph = paragraph;
    navigate("/results", { state: { stats } });
  };

  // Handler to check if user finished typing the paragraph
  const handleInput = () => {
    const inputText = inputRef.current.value;
    // Remove trailing spaces for comparison
    if (inputText.trimEnd() === paragraph.trimEnd()) {
      setTimerOn(false);
      const stats = getStatistics(inputText, paragraph, time);
      stats.paragraph = paragraph;
      navigate("/results", { state: { stats } });
    }
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
          <textarea
            className="fetchTextOverlay"
            ref={inputRef}
            onInput={handleInput}
          ></textarea>
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
