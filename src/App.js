import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Game from './Game';
import Results from "./Components/Results";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}