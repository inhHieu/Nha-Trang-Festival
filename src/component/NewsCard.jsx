import React from "react";
import { motion } from "framer-motion";
import TimeAgo from "../Hook/TimeAgo";
import bg from "../asses/art.jpg";

function NewsCard({ title, summary, date, i, img }) {
  // Create a new Date object from the date string
  const dateObj = new Date(date);

  return (
    <motion.li
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: i * 0.1, type: "spring", bounce: 0 }}
      className="group w-full cursor-pointer"
    >
      <article className="flex flex-col md:flex-row">
        <div className="img-wrap rounded-2xl w-full aspect-video overflow-clip md:w-5/12">
          <img
            className="group-hover:scale-100 w-full  h-full  object-cover  scale-105	duration-300  "
            src={img}
            alt=""
          />
        </div>
        <div className="info w-full px-8 space-y-3 md:w-7/12">
          <div className="title mt-4 tracking-wider text-15 font-bold">
            {title}
          </div>
          <div className="description text-09">{summary}</div>
          <div className="date text-07">
            <TimeAgo date={dateObj} />
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export default NewsCard;
