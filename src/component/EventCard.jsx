import React from "react";
import { motion } from "framer-motion";
import TimeAgo from "../Hook/TimeAgo";
import bg from "../asses/art.jpg";

function EventCard({ name, date, category, img, i }) {
  // Create a new Date object from the date string
  const dateObj = new Date(date);

  return (
    <motion.li
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: i * 0.05, type: "spring", bounce: 0 }}
      className="group"
    >
      <article className="article h-71 w-80 cursor-pointer 	">
        <div className="img-wrap  w-full  h-4/6 overflow-clip rounded-md	">
          <img
            className="group-hover:scale-100 w-full bg-def-gray h-full  object-cover  scale-105	duration-300  "
            src={img}
            alt=""
          ></img>
        </div>
        <div className="into px-4 pt-1">
          <div className="tag text-sea-blue text-05 uppercase tracking-wider	">
            {category}
          </div>
          <div className="title pt-1 font-bold">{name}</div>
          <div className="date pt-3 text-06">
            <TimeAgo date={dateObj} />
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export default EventCard;
