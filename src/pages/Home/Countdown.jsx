import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../style/pages/Home/Countdown.scss";
import TimeAgo from "../../../src/Hook/TimeAgo";
import axios from "axios";

const Countdown = (props) => {
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/events/${44}`
      );
      const data = response.data.dateStart
      const parseData = new Date(data);
      setDate(parseData);//date data look like this 2020-06-03T00:00:00
      setLoading(false)
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getEvent();
    // const dateObj = new Date(date);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 3, duration: 0.3 } }}
      className="Countdown"
    >
      <span>03 June 2023</span>
      <span className="capitalize">
        {!loading &&
        <TimeAgo date={date} />}
      </span>
    </motion.div>
  );
};

export default Countdown;
