import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Signup } from "./Signup";

const Login = ({ user, setUser, setRegister }) => {
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
  useEffect(() => {
    // keyhandler
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
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const login = async () => {
    console.log(userName, passWord);
    try {
      const response = await axios.post(
        "http://localhost:8008/api/login/login",
        JSON.stringify({ userName, passWord }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("user-info", JSON.stringify(response.data));
      setUser(true);
      close();
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
              onChange={(e) => setUserName(e.target.value)}
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
