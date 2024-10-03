import React from "react";
import { Button } from "@mui/material";
import "../css/home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const Navigate = useNavigate();

  const handleClink = () => {
    localStorage.getItem('user') ? 
    Navigate('/') : 
    Navigate('/getstarted')
  }


  return (
    <section className="HomeSection">
      <h1>Human stories & ideas</h1>
      <h3>A place to read, write, and deepen your understanding</h3>
      <button onClick={handleClink}>Get Started</button>
      <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="an inspired image" />
    </section>
  )
}
