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
        {loadings &&
          news.map((item) => (
            <Link to={`/News/${item.news_ID}`} className="item">
              <div className="name">{item.newsTitle}</div>
              <div className="subcription">{item.newsContent}</div>
              <div className="date">3-6-2023</div>
              <div className="subcribed">99999</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default News;
