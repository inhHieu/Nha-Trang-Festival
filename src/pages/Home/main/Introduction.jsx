import React from "react";
import { motion } from "framer-motion";
import "../../../style/pages/Home/main/introduction.scss";
import TakePlace from "./TakePlace";
import Activitives from "./Activitives";
import MobileApp from "./MobileApp";
function Introduction() {
  //   const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <motion.div className="introduction">
      <TakePlace />
      <Activitives />
      <MobileApp />
    </motion.div>
  );
}

export default Introduction;
