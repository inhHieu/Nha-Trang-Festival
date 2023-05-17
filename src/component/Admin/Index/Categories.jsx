import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Categories({ token }) {
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/admincategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(response.data);
      console.log(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if (token) getCategories();
  }, [token]);

  return (
    <div className="box">
      <div className="box-title">
        <p className="name">Categories</p>
        <p className="total">{categories.length}</p>
      </div>
      <div className="data">
        <div className="item head sticky top-0 bg-def-gray">
          <div className="name w-4/12">Name</div>
          <div className="  w-3/12">Event</div>
          <div className="date w-3/12">News</div>
          <div className="subcribed w-2/12">Sub</div>
        </div>
        {loadings &&
          categories.slice(1).map((item, i) => (
            <Link to={`/News/${item.news_ID}`} key={i} className="item">
              <div className="name w-4/12">{item.categoryName}</div>
              <div className="text-center w-3/12">{item.totalEvents}</div>
              <div className="date w-3/12">{item.totalNews}</div>
              <div className="subcribed w-2/12">{item.totalSubscribers}</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Categories;
