import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./results.css";

const Results = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const wpm = "100"; // Static values
  const userAccuracy = location.state.userAccuracy;
  const time = "60"; // Static values
  const errors = "10"; // Static values
  const characters = "100"; // Static values

  return (
    <>
      <Navbar />
      <div className="result">
        <div className="resultShow leftRight">
          <h1>Typing Speed Result</h1>
          <h2>WPM: {wpm}</h2>
          <h2>ACC: {userAccuracy}%</h2>
          <br />
          <h3>Time: {time}s</h3>
          <h3>Errors: {errors}</h3>
          <h3>Chracters: {characters}</h3>
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
