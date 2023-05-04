import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/api/users`);
      setUsers(response.data);
      //   console.log(news.length,news);
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="box">
      <div className="box-title">
        <p className="name">Users</p>
        <p className="total">{users.length}</p>
      </div>
    </div>
  );
}

export default Users;
