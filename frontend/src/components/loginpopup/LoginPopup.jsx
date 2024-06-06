import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <div className="login-popup-title-top">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="login-popup-inputs">
            {currState === "Login" ? null : (
              <input
                name="name"
                onChange={onchangeHandler}
                value={data.name}
                type="text"
                placeholder="Your Name"
                required
              />
            )}
            <input
              name="email"
              onChange={onchangeHandler}
              value={data.email}
              type="email"
              placeholder="Your Email"
              required
            />
            <div>
              <input
                style={{ width: "93%" }}
                name="password"
                onChange={onchangeHandler}
                value={data.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              &nbsp;
              {showPassword ? (
                <IoEyeOutline onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use and privacy policy</p>
          </div>

          {currState === "Login" ? (
            <p>
              Create a new Account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login Here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
