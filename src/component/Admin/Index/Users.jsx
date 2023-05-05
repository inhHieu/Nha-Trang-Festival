import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <div className="data">
        <div className="item head sticky top-0 bg-def-gray">
          <div className="name w-6/12">Name</div>
          <div className="subcription w-2/12">Age</div>
          <div className="date w-3/12">From</div>
          <div className="subcribed w-1/12">Sub</div>
        </div>
        {loadings &&
          users.map((item,i) => (
            <Link to={`/News/${item.news_ID}`} key={i} className="item">
              <div className="name w-6/12">{item.fullName}</div>
              <div className="subcription w-2/12">19</div>
              <div className="date w-3/12">VN</div>
              <div className="subcribed w-1/12">10</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Users;
