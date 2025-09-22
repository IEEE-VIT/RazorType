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
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(true);
  const inputRef = useRef(null);
  const [liveStats, setLiveStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });
  const navigate = useNavigate();

  // Countdown effect
  useEffect(() => {
    if (showCountdown) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setShowCountdown(false);
        setTimerOn(true);
        setTimeout(() => {
          if (inputRef.current) inputRef.current.focus();
        }, 100);
      }
    }
  }, [countdown, showCountdown]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerOn && !showCountdown) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, showCountdown]);

  const handleStart = () => {
    // No longer needed, timer starts after countdown
  };

  const handleReload = () => {
    setParagraph(getRandomParagraph());
    setTime(0);
    setTimerOn(false);
    setCountdown(3);
    setShowCountdown(true);
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

  // Handler to check if user finished typing the paragraph and update live stats
  const handleInput = () => {
    const inputText = inputRef.current.value;
    // Live stats calculation
    if (timerOn && inputText.length > 0) {
      const stats = getStatistics(inputText, paragraph, time === 0 ? 1 : time);
      setLiveStats({ wpm: stats.wpm, accuracy: stats.accuracy, errors: stats.errors });
    } else if (!inputText.length) {
      setLiveStats({ wpm: 0, accuracy: 100, errors: 0 });
    }
    // Remove trailing spaces for comparison
    if (inputText.trimEnd() === paragraph.trimEnd()) {
      setTimerOn(false);
      const stats = getStatistics(inputText, paragraph, time);
      stats.paragraph = paragraph;
      navigate("/results", { state: { stats } });
    }
  };

  // Highlight correct/incorrect words
  const getHighlightedParagraph = () => {
    const inputText = inputRef.current?.value || "";
    const inputWords = inputText.split(" ");
    const paraWords = paragraph.split(" ");
    return paraWords.map((word, idx) => {
      let className = "word-default";
      if (inputWords[idx] !== undefined) {
        className = inputWords[idx] === word ? "word-correct" : "word-incorrect";
      }
      return (
        <span key={idx} className={className}>{word} </span>
      );
    });
  };

  return (
    <>
      <motion.div
        animate={{ y: [500, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="word"
      >
        <div className="textHolder">
          {showCountdown && (
            <div className="countdown-outer">
              <motion.div
                key={countdown}
                className="countdown"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {countdown === 0 ? "Go!" : countdown}
              </motion.div>
            </div>
          )}
          <div className="highlightedParagraph">
            {getHighlightedParagraph()}
          </div>
          <textarea
            className="fetchTextOverlay"
            ref={inputRef}
            onInput={handleInput}
            disabled={showCountdown}
          ></textarea>
          <div className="liveStats">
            <span>Speed: {liveStats.wpm} WPM</span> | <span>Accuracy: {liveStats.accuracy}%</span> | <span>Errors: {liveStats.errors}</span>
          </div>
          <button onClick={buttonHandler} className="accuracy" disabled={showCountdown}>
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
