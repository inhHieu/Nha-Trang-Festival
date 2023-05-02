import React from "react";
import { motion } from "framer-motion";
import "../../style/pages/Home/Countdown.scss";
const Countdown = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 3, duration: 0.3 } }}
      className="Countdown"
    >
      <span>14 June 2023</span>
      <span>96 days left</span>
    </motion.div>
  );
};

export default Countdown;
