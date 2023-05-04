import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";

import '../style/pages/Admin/Index.scss'

function SideBar() {
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
          <button className=" rounded-lg                                        bg-hard-blue text-white">
            <FontAwesomeIcon icon="fa-solid fa-house" className="mr-2" />
            Overview
          </button>
          <button className="rounded-lg text-hard-gray hover:bg-white-purple">
            <FontAwesomeIcon icon="fa-solid fa-newspaper" className="mr-2" />
            News
            <FontAwesomeIcon icon="fa-solid fa-angle-up" className="ml-2" />
          </button>
          <button className="rounded-lg text-hard-gray hover:bg-white-purple">
            <FontAwesomeIcon icon="fa-solid fa-gift" className="mr-2" />
            Events
          </button>
          <button className="rounded-lg text-hard-gray hover:bg-white-purple">
            <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2" />
            User
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SideBar;
