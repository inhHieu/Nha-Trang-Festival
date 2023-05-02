import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Category.scss";

import bg from "../asses/art.jpg";

function Category() {
  const location = useLocation();

  const [category, setCategory] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/categories/${location.state.newsID}`
      );
      setCategory(response.data);
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    console.log("got data");
    getCategory();
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0  }}
      transition={{ bounce: 0 }}
      className="Category-Page"
    >
      <div className="header-img">
        <div className="img-wrap">
          <img src={bg} alt="" />
        </div>
        <div className="title-wrap">
          <div className="title-group">
            <div className="title">{category.categoryName}</div>
            <div className="description">
              <p>{category.categoryDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ol>
          <li>
            <article className="article">
              <div className="img-wrap">
                <img src={bg} alt=""></img>
              </div>
              <div className="into">
                <div className="tag">Art</div>
                <div className="title">Painting material</div>
                <div className="date"> 3 days ago</div>
              </div>
            </article>
          </li>
          <li>
            <article className="article">
              <div className="img-wrap">
                <img src={bg} alt=""></img>
              </div>
              <div className="into">
                <div className="tag">Art</div>
                <div className="title">Painting material</div>
                <div className="date"> 3 days ago</div>
              </div>
            </article>
          </li>
          <li>
            <article className="article">
              <div className="img-wrap">
                <img src={bg} alt=""></img>
              </div>
              <div className="into">
                <div className="tag">Art</div>
                <div className="title">Painting material</div>
                <div className="date"> 3 days ago</div>
              </div>
            </article>
          </li>
        </ol>
      </div>
    </motion.div>
  );
}

export default Category;
