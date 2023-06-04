import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { API_BASE_URL } from "../../Api/BaseUrl";
import NewsCard from "../../component/NewsCard";
import Dropdown from "../../component/Dropdown";

function NewsSection({ id, sort }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryID, setCategoryID] = useState();

  const getNews = async (id, sort, offset) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/news/${sort}/category/${id}?offset=${offset}&limit=6`
      );
      setNews(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  const updateNews = async (id, sort, offset) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/news/${sort}/category/${id}?offset=${offset}&limit=6`
      );
      const newNews = response.data;
      setNews(news.concat(newNews));
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  useEffect(() => {
    setNews([])
    getNews(id, sort, 0);
  }, [id,sort]);

  const handleLoadMore = () => {
    updateNews(id, news.length);
  };

  //============================================================================

  if (loading) {
    return <p>Loading news...</p>;
  }
  return (
    <>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-12 mt-4"
      >
        {news.map((item, i) => (
          <Link to={`/News/${item.newsId}`} key={i}>
            <NewsCard
              i={i}
              title={item.newsTitle}
              summary={item.summary}
              date={item.postedDate}
              img={item.titleImg}
            />
          </Link>
        ))}
      </motion.ul>
      <button
        className="bg-light-blue mt-8 py-1 px-4 rounded-md duration-300 hover:bg-sea-blue hover:text-white"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </>
  );
}

export default NewsSection;
