
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./results.css";
import { calculateWPM } from "../Shared/utils";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { wpm, accuracy, time, errors, characters } = location.state.stats;
  // Calculate gross and net WPM using the utility function
  const { grossWPM, netWPM } = calculateWPM(characters, time, errors);

  return (
    <>
      <Navbar />
      <div className="result">
        <div className="resultShow leftRight">
          <h1>Typing Speed Result</h1>
          <h2>Gross WPM: {grossWPM}</h2>
          <h2>Net WPM: {netWPM}</h2>
          <h2>ACC: {accuracy}%</h2>
          <br />
          <h3>Time: {time}s</h3>
          <h3>Errors: {errors}</h3>
          <h3>Characters: {characters}</h3>
        </div>

        <div className="buttons rightLeft">
          <button
            className="repeat"
            onClick={() => {
              navigate("/game");
            }}
          >
            REPEAT
          </button>
        </div>
      </div>
    </>
  );
};

export default Results;
