import React from "react";
import Hero from "./Hero/Hero";
import Main from "./main/main";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
    key={'home'}
    exit={{x:1000, transition:{delay:3}}}
    className="home" style={{ marginTop: "-4rem" }}>
      <Hero />
      {/* <Countdown/> */}
      <Main />
    </motion.div>
  );
};

export default Home;
