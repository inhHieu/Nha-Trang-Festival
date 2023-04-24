import React, { useState, useEffect } from "react";
import Login from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.scss";
import { useLocation } from "react-router";

const Header = () => {
  gsap.registerPlugin(ScrollTrigger);
  //variable
  const [register, setRegister] = useState();
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const location = useLocation();


  //functions

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      setUser(true);
      const userInfo = JSON.parse(localStorage.getItem("user-info"));
      setUserInfo(userInfo);
    }
  }, [setUser]);
  useEffect(() => {
    if (location.pathname === "/") {
      document.querySelector(".header").classList.add("homepath");
    } else {
      document.querySelector(".header").classList.remove("homepath");
    }
    console.log(location.pathname);
  });
  ScrollTrigger.create({
    trigger: "#root",
    start: "top -20%",
    onUpdate: (self) => {
      const header = document.querySelector(".header");
      if (self.direction === 1) {
        header.classList.add("scrollback");
      } else{
        header.classList.remove("scrollback");
      }
      console.log(self.progress, user)
      if (self.progress > 0.22 ) {
        header.classList.add("solid");
      } else {
        header.classList.remove("solid");
      }
    },
    onLeaveBack: () => {
      const header = document.querySelector(".header");
      header.classList.remove("scrollback");
    },
  });
  return (
    <>
      {register && (
        <Login user={user} setUser={setUser} setRegister={setRegister} />
      )}

      <div className="header">
        {!register && (
          <div className="nav-bar">
            {!user && (
              <div className="right">
                <button className="btn" onClick={setRegister}>
                  {/* <Link className="Link" to='/' >JOIN NOW</Link> */}
                  JOIN NOW
                </button>
              </div>
            )}
            {user && (
              <>
                <div className="left">
                  <ul>
                    <li>Home</li>
                    <li>News</li>
                    <li>Events</li>
                  </ul>
                </div>
                <div className="right">
                  <h5>{userInfo.fullName}</h5>
                  <div className="avatar"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
