import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const decode = token ? jwtDecode(token) : null;


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
// AUTO LOGOUT FUNCTION
  const checkTokenExpiry = () => {
    const currTime = Date.now() / 1000;
    if (decode?.expire < currTime) {
      logout();
    } else {
      const expin = decode?.expire - currTime;
      setTimeout(logout, expin * 1000);
    }
  };
  if (token) {
    checkTokenExpiry();
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`${menu === "home" ? "active" : ""}`}
          >
            home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={`${menu === "menu" ? "active" : ""}`}
          >
            menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mob-app")}
            className={`${menu === "mob-app" ? "active" : ""}`}
          >
            mobile app
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={`${menu === "contact" ? "active" : ""}`}
          >
            contact us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Basket Icon" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Bag Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
