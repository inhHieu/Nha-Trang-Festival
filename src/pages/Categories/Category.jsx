import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { API_BASE_URL } from "../../Api/BaseUrl";
import Dropdown from "../../component/Dropdown";
import EventSection from "./EventSection";
import NewsSection from "./NewsSection";
import "../../style/pages/Category.scss";

import bg from "../../asses/art.jpg";

function Category() {
  // const location = useLocation();
  const { id } = useParams();
  const location = useLocation();
  const event = new URLSearchParams(location.search).get("event");
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const handleDropdownSelect = (value) => {
    setSelected(value);
  };
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("trending");

  const getCategory = () => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category_Id === Number(id)) {
        setCategory(categories[i]);
        break;
      }
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/categories?offset=0&limit=10000`
      );
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCategory();
  }, [categories]);

  const [tab, setTabState] = useState(false);

  const setTab = (value) => {
    localStorage.setItem("tab", value);
    setTabState(value);
  };

  useEffect(() => {
    if (event !== null) {
      const eventTab = event === "true";
      const storedTab = localStorage.getItem("tab");
      setTab(eventTab ?? JSON.parse(storedTab));
    } else {
      const storedTab = localStorage.getItem("tab");
      setTab(JSON.parse(storedTab) ?? false);
    }
  }, [event]);

  useEffect(() => {
    console.log(selected, "from category");
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].categoryName === selected) {
        // console.log("found");
        console.log(categories[i].category_Id);
        navigate("/Categories/" + categories[i].category_Id);
        break;
      }
    }
  }, [selected]);

  //================================================================
  // decoration

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ bounce: 0 }}
      className="Category-Page"
    >
      <div className="header-img">
        <div className="img-wrap">
          <img src={category.image} alt="" />
        </div>
        <div className="title-wrap">
          <div className="title-group">
            <div className="title">{category.categoryName}</div>
            <div className="description">
              <p>{category.categoryDescription}</p>
            </div>
          </div>
        </div>
        <div className="fillter absolute bottom-0  w-[90%] left-1/2 -translate-x-1/2 flex justify-between lg:w-70rem">
          <div className="tab-group w-32 bg-white-blue flex flex-col justify-around rounded-t-lg overflow-clip cursor-pointer md:w-48 md:flex-row">
            <div
              className={`tab w-full py-1 text-center duration-300 md:w-24 md:p-0 ${
                tab ? "" : "bg-def-gray"
              } `}
              onClick={() => setTab(true)}
            >
              Events
            </div>
            <div
              className={`tab w-full py-1 text-center duration-300 md:w-24 md:p-0 ${
                !tab ? "" : "bg-def-gray"
              } `}
              onClick={() => setTab(false)}
            >
              News
            </div>
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
      <div className="container w-[90%] pb-12 flex flex-col items-center lg:w-full">
        {tab ? (
          <EventSection id={category.category_Id} categories={categories} />
        ) : (
          <>
            <div className="flex gap-2 self-end border border-gray-200 px-2 py-1 rounded-md focus:border-red-500">
              <p>Sort:</p>
              <select
                name="sort"
                id="sort"
                className=" "
                onChange={(e) => {
                  console.log(e.target.value);
                  setSort(e.target.value);
                }}
              >
                <option value="trending">Trending</option>
                <option value="lastest">Latest</option>
              </select>
            </div>
            <NewsSection id={category.category_Id} sort={sort} />
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Category;
