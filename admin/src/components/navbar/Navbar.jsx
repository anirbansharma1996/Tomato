import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <a
        href="https://tomato-gray-five.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="logo" src={assets.logo} alt="" />
      </a>
    </div>
  );
};

export default Navbar;
