import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import "./introduction.scss";
import bg from "../../../asses/LotusTower.jpg";

function Introduction() {
  const animateRef = useRef();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.13, 0.25, 0.3, 1],
    [0, 1, 1, 0, 0]
  );
  const text1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    ["3rem", "3rem", "-1rem", "-1rem", "-3rem", "-20rem"]
  );
  const text2 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    ["-3rem", "0rem", "0rem", "0rem", "20rem", "20rem"]
  );
  //   const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <motion.div ref={animateRef} className="introduction">
      <main>
        <section className="section section1">
          <motion.div
            className="left-text "
            style={{ opacity: opacity1, y: text1 }}
          >
            <span>Summer</span>
            <span>Every 2 years </span>
            <span>At</span>
            <span>Nha Trang, Viet Nam</span>
          </motion.div>
          <motion.div
            className="image-wrap"
            style={{ opacity: opacity2, y: text2 }}
          >
            <img src={bg} alt="" />
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
}

export default Introduction;
