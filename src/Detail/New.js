import React from "react";
import { motion } from "framer-motion";
import "./New.scss";
function New(){
  return (
    <motion.div
    initial={{y:100}}
    animate={{y:0 , }}
    transition={{ type: "spring", bounce: 0 }}
    exit={{opacity:0}}
     className="News">
      <div className="title-img">
        <img src="" alt=""></img>
      </div>
      <div className="container">
        <div className="title">Api new title</div>
        <div className="contents">There is something interesting here...</div>
      </div>
    </motion.div>
  );
};

export default New;
