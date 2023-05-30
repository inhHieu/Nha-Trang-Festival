import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useLocation } from "react-router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../style/component/Header.scss";
import defAvatar from "../../../src/asses/defaultAvatar.jpg"

const Header = () => {
  //variable
  const [register, setRegister] = useState(false);
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
  }, [setUser, user]);
  useEffect(() => {
    if (location.pathname === "/") {
      document.querySelector(".header").classList.add("homepath");
    } else {
      document.querySelector(".header").classList.remove("homepath");
    }
  });

  const { scrollY } = useScroll();
  const [previous, setPrevious] = useState();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setPrevious(latest);
    const header = document.querySelector(".header");
    if (latest > previous) header.classList.add("scrollback");
    else if (latest < previous) header.classList.remove("scrollback");
    if (user === true) {
      if (latest > 700) {
        header.classList.add("solid");
        header.classList.add("black");
      } else {
        header.classList.remove("solid");
        header.classList.remove("black");
      }
    }
  });

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
                  <Link to="/Categories/1?event=false" className="Link">
                    News
                  </Link>
                </li>
                <li>
                  <Link to="/Categories/1?event=true" className="Link">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            {user && (
              <>
                <div className="right">
                  <h5>
                    {userInfo.user.firstName != null ? userInfo.user.firstName : ''}
                    {userInfo.user.lastName != null ? " " + userInfo.user.lastName : ""}
                  </h5>
                  <Link to="/User">
                    <div className="avatar overflow-clip">
                      <img src={userInfo.user.avatar != null ? userInfo.user.avatar : defAvatar} alt="" />
                    </div>
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
