import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getNews = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/api/news`);
      setNews(response.data);
      //   console.log(news.length,news);
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="box">
      <div className="box-title">
        <p className="name">News</p>
        <p className="total">{news.length}</p>
      </div>
      <div className="data">
        <div className="item head sticky top-0 bg-def-gray">
          <div className="name w-3/12">Name</div>
          <div className="subcription w-6/12">Description</div>
          <div className="date w-2/12">Date</div>
          <div className="subcribed w-1/12">View</div>
        </div>
        {loadings &&
          news.map((item,i) => (
            <Link to={`/News/${item.news_ID}`} key={i} className="item">
              <div className="name w-3/12">{item.newsTitle}</div>
              <div className="subcription w-6/12">{item.newsContent}</div>
              <div className="date w-2/12">3-6-2023</div>
              <div className="subcribed w-1/12">99999</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default News;
