import React, { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/api/Categories`);
      setCategories(response.data);
      //   console.log(news.length,news);
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="box">
      <div className="box-title">
        <p className="name">Categories</p>
        <p className="total">{categories.length}</p>
      </div>
    </div>
  );
}

export default Categories;
