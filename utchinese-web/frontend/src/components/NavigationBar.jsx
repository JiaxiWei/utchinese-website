import React from "react";
import "./NavigationBar.css";
import logo from "../assets/logo.png";
import canadaFlag from "../assets/flag_can.png";
import chinaFlag from "../assets/flag_china.png";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="UTChinese Network" />
        <span>UTChinese Network</span>
      </div>

      <div className="navbar-language">
        <span className="lang-option">
          <img src={canadaFlag} alt="English" /> EN
        </span>
        <h1>|</h1>
        <span className="lang-option">
          <img src={chinaFlag} alt="Chinese" /> ZH
        </span>
      </div>

      <ul className="navbar-links">
        <li><a href="#events">Events</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#join">Join Us</a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
