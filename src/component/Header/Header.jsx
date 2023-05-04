import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Login from "./Login";
import { useLocation } from "react-router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../style/component/Header.scss";

const Header = () => {
  gsap.registerPlugin(ScrollTrigger);
  //variable
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const location = useLocation();

  //functions

  useEffect(() => {
    if (sessionStorage.getItem("user-info")) {
      setUser(true);
      const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      setUserInfo(userInfo);
    }
  }, [setUser, user]);
  useEffect(() => {
    if (location.pathname === "/") {
      document.querySelector(".header").classList.add("homepath");
    } else {
      document.querySelector(".header").classList.remove("homepath");
    }
  });
  ScrollTrigger.create({
    trigger: "#root",
    start: "top -20%",
    onUpdate: (self) => {
      const header = document.querySelector(".header");
      if (self.direction === 1) {
        header.classList.add("scrollback");
      } else {
        header.classList.remove("scrollback");
      }
      if (user === true) {
        if (self.progress > 0.21) {
          header.classList.add("solid");
          header.classList.add("black");
        } else {
          header.classList.remove("solid");
          header.classList.remove("black");
        }
      }
    },
    onLeaveBack: () => {
      const header = document.querySelector(".header");
      header.classList.remove("scrollback");
    },
  });

  // const [isPending, startTransition] = useTransition();

  return (
    <>
      {register && <Login setUser={setUser} setRegister={setRegister} />}

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
            <div className="left">
              <ul>
                <li>
                  <Link to="/" className="Link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/News" className="Link">
                    News
                  </Link>
                </li>
                <li>
                  <Link to="/" className="Link">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            {user && (
              <>
                <div className="right">
                  <h5>{userInfo.fullName}</h5>
                  <Link to="/User">
                    <div className="avatar"></div>
                  </Link>
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
