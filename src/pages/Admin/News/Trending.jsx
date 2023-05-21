import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
  const [id, setID] = useState(1);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const getNews = async (id, offset) => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/news/trending/category/${id}?offset=${offset}&limit=9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newNews = response.data;
      setNews(news.concat(newNews));
      // setNews(response.data)
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const getNewsCID = async (id, offset) => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/news/trending/category/${id}?offset=${offset}&limit=9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // const newNews = response.data;
      // setNews(news.concat(newNews));
      setNews(response.data)
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
    if (token) getNews(id, 0);
    getCategories();
  }, [token]);
  const [selected, setSelected] = useState("");
  const handleDropdownSelect = (value) => {
    setSelected(value);
    for (let i = 0; i < categories.length; i++)
      if (categories[i].categoryName === value) {
        console.log(categories[i].category_Id);
        setID(categories[i].category_Id);
        if (token) {
          setNews([])
          getNewsCID(categories[i].category_Id, 0);
        }
      }
  };

  const handleLoadMore = () => {
    getNews(id, news.length);
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
              <Link key={i} to={`/Admin/News/Trending/${item.newsId}`}>
                <EventCard
                  name={item.newsTitle}
                  date={item.postedDate}
                  img={item.titleImg}
                  category={item.category.categoryName}
                />
              </Link>
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
          <button
            className="bg-light-blue mb-8 py-1 px-28 rounded-md duration-300 hover:bg-sea-blue hover:text-white"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </ul>
      </main>
      <div className="add group absolute text-[2rem] leading-[3rem] w-12 h-12 text-center rounded-full bottom-6 right-4 text-white cursor-pointer grid place-items-center   bg-hard-blue">
        <Link to={`/Admin/News/Trending/Add`}>
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            className="group-hover:rotate-180 duration-300 "
          />
        </Link>
      </div>
    </div>
  );
}

export default Trending;
