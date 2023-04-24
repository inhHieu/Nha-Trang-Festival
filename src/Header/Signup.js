import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Signup = ({ setSignup }) => {
  return (
    <div className="signup">
      <p>Sign Up</p>
      <label>Email Address</label>
      <input type="text" className="username"></input>
      <label>Password</label>
      <input type="password" className="password"></input>
      <label>Confirm Password</label>
      <input type="password" className="password confirm"></input>
      <div className="row">
        <div className="signed">
          Already have an account?{" "}
          <span onClick={(e) => setSignup((prev) => !prev)}>Log in</span>
        </div>
        <button className="login-btn">Sign up</button>
      </div>
      <div className="orther-login">
        <p>or sign up with</p>
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
  );
};
