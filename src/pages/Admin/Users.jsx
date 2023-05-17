import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
 

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/adminusers?offset=0&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if(token)
    getUsers();
  }, [token]);
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
            users.map((item, i) => <UserCard key={i} user={item} />)
          ) : (
            <>
              <li className="flex w-11/12 px-2 py-2 text-08 rounded-md bg-light-blue">
                <p className="name w-3/12">Name</p>
                <p className="description w-8/12">Email</p>
                <p className="date w-2/12 text-center">Address</p>
                <p className="view w-1/12 text-right">Subcribed</p>
              </li>
              {users.map((item, i) => (
                <UserRow key={i} item={item} />
              ))}
            </>
          )}
        </ul>
      </main>
    </div>
  );
}

export default Users;
