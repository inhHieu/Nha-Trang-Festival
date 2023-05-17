import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import Dropdown from "../../../component/Dropdown";
import EventCard from "../../../component/EventCard";
import NewRow from "../../../component/Admin/NewRow.jsx";

function Trending() {
  const [active, setActive] = useState(true);

  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const getNews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8008/api/news/trending?offset=0&&limit=10"
      );
      setNews(response.data);
      console.log("got data");
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
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
    if (token) getNews();
    getCategories();
  }, [token]);
  const [selected, setSelected] = useState("");
  const handleDropdownSelect = (value) => {
    setSelected(value);
  };
  return (
    <div className="A-News h-screen">
      <div className="head flex justify-between">
        <p className="title">News</p>
        <div className="options flex items-center  h-12 mt-5 mr-5 ">
          <div className="filter">
            <Dropdown
              list={categories}
              name={category.categoryName}
              value={selected}
              onSelect={handleDropdownSelect}
            />
          </div>
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
            news.map((item, i) => (
              <EventCard key={i} name={item.newsTitle} date={item.postedDate} img={item.titleImg} category={item.category.categoryName} />
            ))
          ) : (
            <>
              <li className="flex w-11/12 px-2 py-2 text-08 bg-light-blue">
                <p className="name w-3/12">Name</p>
                <p className="description w-8/12">Summary</p>
                <p className="date w-2/12 text-center">Posted Date</p>
                <p className="view w-1/12 text-right">Views</p>
              </li>
              {news.map((item, i) => (
                <NewRow key={i} item={item} />
              ))}
            </>
          )}
        </ul>
      </main>
    </div>
  );
}

export default Trending;
