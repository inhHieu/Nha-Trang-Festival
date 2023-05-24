import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "../../component/Admin/UserCard";
import UserRow from "../../component/Admin/UserRow";

function Users() {
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const getUsers = async (offset) => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/adminusers?offset=${offset}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newUsers = response.data;
      setUsers(users.concat(newUsers));
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if (token) getUsers(0);
  }, [token]);

  const handleLoadMore = () => {
    getUsers(users.length);
  };

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
          {active ? (
            users.map((item, i) => (
              <Link key={i} to={`/Admin/Users/${item.user_ID}`}>
                <UserCard key={i} user={item} />
              </Link>
            ))
          ) : (
            <>
              <li className="flex w-11/12 px-2 py-2 text-08 rounded-md bg-light-blue">
                <p className="name w-3/12">Name</p>
                <p className="description w-5 /12">Email</p>
                <p className="date w-5/12 text-center">Address</p>
                <p className="view w-1/12 text-right">Subcribed</p>
              </li>
              {users.map((item, i) => (
                <UserRow key={i} item={item} />
              ))}
            </>
          )}
          <button
            className="bg-light-blue h-min self-center py-1 px-12 rounded-md duration-300 hover:bg-sea-blue hover:text-white"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </ul>
      </main>
      <div className="add group absolute text-[2rem] leading-[3rem] w-12 h-12 text-center rounded-full bottom-6 right-4 text-white cursor-pointer grid place-items-center  bg-hard-blue">
        <Link to="/Admin/Users/Add">
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            className="group-hover:rotate-180 duration-300 "
          />
        </Link>
      </div>
    </div>
  );
}

export default Users;
