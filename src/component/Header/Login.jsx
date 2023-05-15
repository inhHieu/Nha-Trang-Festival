import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

import { Signup } from "./Signup";

const Login = ({ setUser, setRegister }) => {
  // decoration
  const [signup, setSignup] = useState(true);
  const close = () => {
    setRegister(false);
  };
  const loginRef = useRef();
  const close2 = (e) => {
    if (loginRef.current === e.target) {
      setRegister(false);
    }
  };
  // keyhandler
  useEffect(() => {
    const keyDownHandler = (event) => {
      // console.log("User pressed: ", event.key);
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (!signup) login();
          // else
          break;
        case "Escape":
          event.preventDefault();
          setRegister(false);
          break;
        default:
          return null;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  //API login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function GetUserInfo(id, token) {
    try{
      const response = await axios.get(
          `http://localhost:8008/api/subscribed/subid/${id}`,
          {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
        );
        const data = await response.data;
        localStorage.setItem("user-sub", JSON.stringify(response.data));
        // setData(data);
        setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }
 

  const login = async () => {
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:8008/api/token",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("user-info", JSON.stringify(response.data));
      setUser(true);
      
      await GetUserInfo(response.data.user.user_ID, response.data.token);
  
      close();
      //---
      if (location.pathname != "/") {
        navigate(0);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="login-wrapper" ref={loginRef} onClick={close2}>
        <div className="close" onClick={close}>
          <FontAwesomeIcon icon="fas fa-times" />
        </div>
        {/* signup */}
        {signup && <Signup setSignup={setSignup} />}
        {/* login */}
        {!signup && (
          <div className="login">
            <p>Log in</p>
            <label>Email</label>
            <input
              type="text"
              className="username"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Password</label>
            <input
              type="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div className="forgot-pw">Forgot password</div>
            <div className="row">
              <div className="signin">
                New here?{" "}
                <span onClick={(e) => setSignup((prev) => !prev)}>Sign up</span>
              </div>
              <button className="login-btn" onClick={login}>
                Log in
              </button>
            </div>
            <div className="orther-login">
              <p>or log in with</p>
              <div className="options">
                <div className="option">
                  <FontAwesomeIcon icon="fab fa-google" />{" "}
                </div>
                <div className="option">
                  <FontAwesomeIcon icon="fab fa-facebook-f" />{" "}
                </div>
                <div className="option">
                  <FontAwesomeIcon icon="fab fa-twitter" />{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;