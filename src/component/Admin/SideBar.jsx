import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link, useLocation } from "react-router-dom";

import "../../style/pages/Admin/Index.scss";

function SideBar() {
  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/Admin":
        setActive(1);
        break;
      case "/Admin/News/Trending":
        setActive(2);
        break;
      case "/Admin/Events":
        setActive(3);
        break;
      case "/Admin/Users":
        setActive(4);
        break;
      default:
        setActive(0);
        break;
    }
  }, [location]);
  useEffect(() => {
    console.log("current", active);
  }, [active]);
  return (
    <div className="admin-page flex bg-white-blue">
      <div className="side-bar bg-def-gray">
        <div className="user-status flex flex-wrap items-center ml-5 mt-5 cursor-pointer">
          <div className="avatar-wrapper w-10 h-10 bg-white-blue rounded-full mr-2">
            <img src="" alt="" />
          </div>
          <div className="user-name">Shaun</div>
        </div>
        <div className="options mt-7 flex flex-col ">
          <Link to="/Admin">
            <button
              className={`rounded-lg duration-300 ${
                active === 1
                  ? "bg-hard-blue text-white "
                  : "text-hard-gray bg-transparent hover:bg-white-purple"
              }`}
            >
              <FontAwesomeIcon icon="fa-solid fa-house" className="mr-2" />
              Overview
            </button>
          </Link>
          <Link to="/Admin/Events">
            <button
              className={`rounded-lg duration-300 ${
                active === 3
                  ? "bg-hard-blue text-white "
                  : "text-hard-gray bg-transparent hover:bg-white-purple"
              }`}
            >
              <FontAwesomeIcon icon="fa-solid fa-gift" className="mr-2" />
              Events
            </button>
          </Link>
          <Link to="/Admin/News/Trending">
            <button
              className={`rounded-lg duration-300 ${
                active === 2
                  ? "bg-hard-blue text-white "
                  : "text-hard-gray bg-transparent hover:bg-white-purple"
              }`}
            >
              <FontAwesomeIcon icon="fa-solid fa-newspaper" className="mr-2" />
              News
            </button>
          </Link>

          <Link to="/Admin/Users">
            <button
              className={`rounded-lg duration-300 ${
                active === 4
                  ? "bg-hard-blue text-white "
                  : "text-hard-gray bg-transparent hover:bg-white-purple"
              }`}
            >
              <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2" />
              User
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SideBar;
