import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import "../../style/pages/Admin/Index.scss";

function SideBar() {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user-info"));
    // console.log(data.user)
    setUserInfo(data.user);
  }, []);

  useEffect(() => {
    switch (true) {
      case location.pathname === "/Admin":
        setActive(1);
        break;
      case location.pathname.startsWith("/Admin/News/Trending"):
        setActive(2);
        break;
      case location.pathname.startsWith("/Admin/Events"):
        setActive(3);
        break;
      case location.pathname.startsWith("/Admin/Users"):
        setActive(4);
        break;
      case location.pathname.startsWith("/Admin/Categories"):
        setActive(5);
        break;
      default:
        setActive(0);
        break;
    }
  }, [location]);
  // useEffect(() => {
  //   console.log("current", active);
  // }, [active]);
  return (
    <div className="admin-page flex bg-white-blue">
      <div className="side-bar bg-def-gray flex flex-col justify-between">
        <div>
          <Link
            to={`/Admin/Users/${userInfo?.user_ID}`}
            className="user-status flex flex-wrap items-center mx-5 mt-5 cursor-pointer gap-2 justify-center"
          >
            <div className="avatar-wrapper w-10 h-10 bg-white-blue rounded-full">
              <img src={userInfo?.avatar} alt="" />
            </div>
            <div className="user-name">{userInfo?.firstName}</div>
          </Link>
          <div className="options mt-7 flex flex-col ">
            <Link to="/Admin">
              <button
                className={`rounded-lg duration-300 flex items-center justify-center xl:justify-start ${
                  active === 1
                    ? "bg-hard-blue text-white "
                    : "text-hard-gray bg-transparent hover:bg-white-purple"
                }`}
              >
                <FontAwesomeIcon icon="fa-solid fa-house" className="mr-2" />
                <p className="hidden xl:block"> Overview</p>
              </button>
            </Link>
            <Link to="/Admin/Events">
              <button
                className={`rounded-lg duration-300 flex items-center justify-center xl:justify-start ${
                  active === 3
                    ? "bg-hard-blue text-white "
                    : "text-hard-gray bg-transparent hover:bg-white-purple"
                }`}
              >
                <FontAwesomeIcon icon="fa-solid fa-gift" className="mr-2" />
                <p className="hidden xl:block"> Events</p>
              </button>
            </Link>
            <Link to="/Admin/News/Trending">
              <button
                className={`rounded-lg duration-300 flex items-center justify-center xl:justify-start ${
                  active === 2
                    ? "bg-hard-blue text-white "
                    : "text-hard-gray bg-transparent hover:bg-white-purple"
                }`}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-newspaper"
                  className="mr-2"
                />
                <p className="hidden xl:block"> News</p>
              </button>
            </Link>

            <Link to="/Admin/Users">
              <button
                className={`rounded-lg duration-300 flex items-center justify-center xl:justify-start ${
                  active === 4
                    ? "bg-hard-blue text-white "
                    : "text-hard-gray bg-transparent hover:bg-white-purple"
                }`}
              >
                <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2" />
                <p className="hidden xl:block"> User</p>
              </button>
            </Link>
            <Link to="/Admin/Categories">
              <button
                className={`rounded-lg duration-300 flex items-center justify-center xl:justify-start ${
                  active === 5
                    ? "bg-hard-blue text-white "
                    : "text-hard-gray bg-transparent hover:bg-white-purple"
                }`}
              >
                <FontAwesomeIcon icon="fa-solid fa-cubes-stacked" className="mr-2" /> 
                <p className="hidden xl:block"> Categories</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`rounded-lg duration-300 text-07 font-semibold py-1 px-3 text-red-500 hover:bg-red-500 hover:text-white `}
            onClick={() => {
              localStorage.removeItem("user-info");
              navigate("/Login");
            }}
          >
            Log out
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-right-from-bracket"
              className="ml-2"
            />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SideBar;
