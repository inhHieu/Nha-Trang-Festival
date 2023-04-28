import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import axios from "axios";
import "./Trending.scss";
const Trending = () => {

const [trends, setTrends] = useState([]);
const [loadings, setLoadings] = useState(false);

const getTrends = async () => {
  try {
    const response = await axios.get("http://localhost:8008/api/news/trending");
    setTrends(response.data);
    console.log("got data");
    setLoadings(true);
  } catch (error) {
    alert("Error: " + error.message);
  }
};
  //APIs call
  useEffect(() => {
    getTrends();
  }, []);
  //----------------------------------------------------------------
  /// animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.8,
        bounce: 0,
        staggerChildren: 0.15,
      },
    },
  };
  const EventName = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        bounce: 0,
        delay: 0.8,
        ease: "linear",
      },
    },
  };
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("show");
    }
  }, [control, inView]);
  return (
    <motion.div className="Trending" ref={ref}>
      <p>TRENDING</p>
      {loadings &&
        trends.map((trending) => (
          <Link className="Link" to="/News"  key={trending.news_ID}>
            <motion.div
              className="NewsSection"
              variants={container}
              initial="hidden"
              animate={control}
            >
              <motion.div className="image" variants={item}>
                <img src="" alt=""></img>
              </motion.div>
              <motion.div className="content" variants={EventName}>
                <div className="title">{trending.newsTitle}</div>
                <div className="summary">{trending.newsContent}</div>
                <div className="posted"> {trending.postedDate}</div>
              </motion.div>
            </motion.div>
          </Link>
        ))}
    </motion.div>
  );
};
// return (
//   <div className="Trending">
//   <p>TRENDING</p>
//   {loadings &&
//     trends.map((trending) => (
//       <div className="NewsSection">
//         <div className="image">
//           <img src="" alt=""></img>
//         </div>
//         <div className="content">
//           <div className="title">{trending.newsTitle}</div>
//           <div className="summary">{trending.newsContent}</div>
//           <div className="posted"> {trending.postedDate}</div>
//         </div>
//       </div>
//     ))}
// </div>
// );
export default Trending;
