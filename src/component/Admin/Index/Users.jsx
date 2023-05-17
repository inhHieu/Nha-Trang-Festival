import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Age from "../../../Hook/Age";

function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/adminusers?offset=0&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data);
      console.log(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if (token != null) getUsers();
  }, [token]);

  return (
    <div className="box">
      <div className="box-title">
        <p className="name">Users</p>
        <p className="total">{users.length}</p>
      </div>
      <div className="data">
        <div className="item head sticky top-0 bg-def-gray">
          <div className="name w-6/12">Name</div>
          <div className="subcription w-2/12">Age</div>
          <div className="date w-3/12">From</div>
          <div className="subcribed w-1/12">Sub</div>
        </div>
        {loadings &&
          users.map((item, i) => (
            <Link to={`/News/${item.news_ID}`} key={i} className="item">
              <div className="name w-6/12">
                {item.firstName + " " + item.lastName}
              </div>
              <div className="subcription w-2/12"><Age date={new Date(item.age)}/></div>
              <div className="date w-3/12">VN</div>
              <div className="subcribed w-1/12">{item.total_subscriptions}</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Users;
