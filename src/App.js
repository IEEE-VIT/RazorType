import React from 'react'
import Body from './Components/Body'
import Navbar from './Components/Navbar'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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