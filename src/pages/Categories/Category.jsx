import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";

import Dropdown from "../../component/Dropdown";
import EventCard from "../../component/EventCard";
import "../../style/pages/Category.scss";

import bg from "../../asses/art.jpg";

function Category() {
  // const location = useLocation();
  const { id } = useParams();

  const [selected, setSelected] = useState("");
  const handleDropdownSelect = (value) => {
    setSelected(value);
  };
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);
  
  function getCategory() {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category_ID === Number(id)) {
        console.log("found");
        setCategory(categories[i]);
      }
    }
  }
  const getCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/api/categories`);
      setCategories(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    console.log("got data");
    getCategories();
    getCategory();
  }, []);

  useEffect(() => {
    console.log(selected, "from category");
  }, [selected]);
  

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
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
        <div className="fillter absolute bottom-0  w-70rem left-1/2 -translate-x-1/2 flex justify-between">
          <div className="tab-group w-48 bg-white-blue flex justify-around  rounded-t-lg overflow-clip duration-300">
            <div className="tab w-24 text-center bg-def-gray">Events</div>
            <div className="tab w-24 text-center bg-white-blue">News</div>
          </div>
          <div className="cate-drop pl-4 bg-white-blue rounded-t-lg overflow-clip">
            <label>
              Categories:
              <Dropdown
                list={categories}
                name={category.categoryName}
                value={selected}
                onSelect={handleDropdownSelect}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="container">
        <ol>
          <EventCard />
          <EventCard />
          <EventCard />
        </ol>
      </div>
    </motion.div>
  );
}

export default Category;
