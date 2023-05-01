import React from "react";
import Hero from "./Hero/Hero";
import Main from "./main/main";
import { motion } from "framer-motion";
// import SmoothScroll from "../SmoothScroll";
function Home() {
  return (
    // <SmoothScroll>
      <motion.div
        key={"home"}
        // exit={{ y: -100, transition:{ type: "spring", bounce: 0} }}
        // initial={{opacity: 0}}
        // animate={{opacity: 1, transition:{delay:.5}}}
        // exit={{opacity:0 , transition:{duration:.5}}}
        className="home"
        style={{ marginTop: "-4rem"}}
      >
        <Hero />
        {/* <Countdown/> */}
        <Main />
      </motion.div>
    // </SmoothScroll>
  );
}

export default Home;

