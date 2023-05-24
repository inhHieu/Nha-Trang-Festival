import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../../style/pages/Home/main/Trending.scss";

const Trending = () => {
  const [trends, setTrends] = useState([]);
  const [loadings, setLoadings] = useState(true);

  const getTrends = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8008/api/news/trending?offset=0&limit=3"
      );
      setTrends(response.data);
      console.log("got data");
      setLoadings(false);
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
        type: "spring",
        staggerChildren: 0.15,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
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
        type: "spring",
        duration: 0.5,
        bounce: 0,
        delay: 0.8,
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
  if (loadings) {
    return (
      <div className="Trending pb-20 pt-28 animate-pulse">
        <div className=" flex h-52">
          <div className="w-[45%] h-full bg-def-gray rounded-lg flex-shrink-0"></div>
          <div className=" mx-8   w-full flex flex-col gap-3">
            <div className=" bg-light-gray w-full h-12 rounded-md"></div>
            <div className=" bg-light-gray w-4/5 h-2/3 rounded-md  "> </div>
            <div className=" bg-light-gray w-12 h-4 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <motion.div className="Trending pb-20 w-full flex flex-col gap-7 2xl:w-[980px] sm:py-20" ref={ref}>
      <p className="mb-7 text-10 tracking-[0.1rem]">TRENDING NEWS</p>
      {!loadings &&
        trends.map((trending) => (
          <Link
            className="Link"
            // state={{ newsID: trending.newsId }}
            to={`/News/${trending.newsId}`}
            key={trending.newsId}
          >
            <motion.div
              className="NewsSection group flex flex-col  cursor-pointer sm:flex-row sm:h-52 "
              variants={container}
              initial="hidden"
              animate={control}
            >
              <motion.div
                className="image w-full h-full bg-def-gray rounded-lg flex-shrink-0 overflow-clip sm:w-[45%] "
                variants={item}
              >
                <img
                  src={trending.titleImg}
                  alt=""
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 duration-300"
                ></img>
              </motion.div>
              <motion.div className="content mx-8" variants={EventName}>
                <div className="title text-[1.6rem] font-bold tracking-[.1rem] group-hover:text-sea-blue duration-300">
                  {trending.newsTitle}
                </div>
                <div className="summary mt-3 text-08 ">{trending.summary}</div>
                <div className="posted mt-3 italic text-07 ">
                  {" "}
                  {trending.postedDate}
                </div>
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
