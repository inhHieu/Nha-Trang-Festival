import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import UserCard from "../../component/Admin/UserCard";

function Users() {
  const [active, setActive] = useState(true);

  return (
    <div className="A-Users h-screen">
      <div className="head flex justify-between">
        <p className="title">Users</p>
        <div className="options flex items-center h-12 mt-5 mr-5 ">
          <div
            className={`option ml-2 px-2 cursor-pointer rounded-tl-md rounded-bl-md duration-300 ${
              !active ? "bg-hard-blue text-white" : "bg-def-gray"
            }`}
            onClick={() => setActive(false)}
          >
            <FontAwesomeIcon icon="fa-solid fa-list" />
          </div>
          <div
            className={`option px-2 cursor-pointer  rounded-tr-md rounded-br-md duration-300 ${
              active ? "bg-hard-blue text-white" : "bg-def-gray"
            }`}
            onClick={() => setActive(true)}
          >
            <FontAwesomeIcon icon="fa-solid fa-table-cells-large" />
          </div>
        </div>
      </div>
      <main className="w-full h-5/6 overflow-auto overflow-x-hidden ">
        <ul className="list-none flex flex-wrap gap-2 justify-center w-full">
          <UserCard />
        </ul>
      </main>
    </div>
  );
}

export default Users;
