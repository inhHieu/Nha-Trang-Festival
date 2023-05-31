import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../../style/pages/New.scss";
// import ColorThief from "colorthief";

import Loader from "../../../src/component/Loader";

function New(props) {
  const imgWrapRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [loadings2, setLoadings2] = useState(true);
  const [date, setDate] = useState();

  const getNews = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/api/news/${id}`);
      console.log(response.data);
      setNews(response.data);
      const data = response.data.postedDate.slice(0, -9);
      setDate(data);
    } catch (error) {
      console.log("Error: " + error.message);
    } finally {
      setLoadings(false);
    }
  };

  const getSuggest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/news/lastest/category/${news.categoryId}?offset=0&limit=4`
      );
      console.log("respond:", response.data, "id:", id);
      const filteredSuggest = response.data.filter(
        (item) => item.newsId !== parseInt(id)
      );
      console.log(filteredSuggest, "filter");
      setSuggest(filteredSuggest);
    } catch (error) {
      console.log("Error: " + error.message);
    } finally {
      setLoadings2(false);
    }
  };

  // APIs call
  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    getSuggest();
  }, [news, id]);
  // useEffect(() => {
  // }, [suggest, id]);
 
if (loadings) return <Loader />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ bounce: 0 }}
      // exit={{ y: -100, transition:{type: "spring", bounce: 0} }}
      // initial={{opacity: 0}}
      // animate={{opacity: 1,transition:{delay:.5}}}
      // exit={{ opacity:0 ,transition:{duration:.5}}}

      // style={{ color: result }}
      className="News -mt-16 min-h-screen"
      ref={imgWrapRef}
    >
      <div className="title-img w-full h-[27rem] ">
        <img
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          src={news.titleImg}
          alt=""
        ></img>
      </div>
      <div className="container flex gap-4  py-11 mx-auto w-[80%] min-h-[200vh]  2xl:w-[70rem] ">
        <div className=" w-1/5 h-full "></div>
        <article className="w-3/5">
          <div className="title text-07">{date}</div>
          <div className="title text-20">{news.newsTitle}</div>
          <div className="text-justify">
            {news.newsContent.split("[IMAGE]").map((text, i) => (
              <>
                {text}
                {i === 0 && (
                  <img
                    className="mx-auto my-4"
                    src={news.titleImg}
                    alt=""
                  />
                )}
              </>
            ))}
          </div>
        </article>

        <ol className=" sticky top-4 w-1/5 mt-32 h-full flex flex-col items-center">
          {suggest.length !== 0 && (
            <>
              <p className=" w-full text-left px-4 py-4 text-09 font-semibold tracking-tighter">
                Relative news
              </p>
              {suggest.map((item, i) => (
                <article className="flex flex-col w-4/5  ">
                  <div className="img-wrap rounded-lg w-full aspect-video overflow-clip ">
                    <img
                      className="group-hover:scale-100 w-full  h-full  object-cover  scale-105	duration-300  "
                      src={item.titleImg}
                      alt=""
                    />
                  </div>
                  <div className="info w-full px-2 space-y-3 ">
                    <div className="title mt-1 min-h-[2rem] tracking-wider text-center text-06 font-bold">
                      {item.newsTitle}
                    </div>
                    <div className="date text-07">
                      {/* <TimeAgo date={dateObj} /> */}
                    </div>
                  </div>
                </article>
              ))}
            </>
          )}
        </ol>
      </div>
    </motion.div>
  );
}

export default New;
