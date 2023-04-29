import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import "./introduction.scss";
import bg from "../../../asses/LotusTower.jpg";
import bg2 from "../../../asses/beach1.jpg";

function Introduction() {
  const animateRef = useRef();
  const { scrollYProgress } = useScroll();

  const tracking = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const opacity1a = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.25, 0.3, 1],
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
  const text1a = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.25, 0.3, 1],
    ["3rem", "3rem", "-1rem", "-1rem", "-3rem", "-20rem"]
  );
  const text2 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    ["-5rem", "0rem", "0rem", "0rem", "20rem", "20rem"]
  );
  //   const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <motion.div ref={animateRef} className="introduction">
      <main>
        <section className="section section1">
          <div className="text-group">
            <motion.div
              className="left-text "
              style={{ opacity: opacity1, y: text1 }}
            >
              <span>Summer</span>
              <span>Every 2 years </span>
              <span>At</span>
              <span>Nha Trang, Viet Nam</span>
            </motion.div>
            <motion.p style={{ opacity: opacity1a, y: text1a }}>
              <span>Free</span> to join for erveryone <br /> With the theme is
              'Khanh Hoa - Hope and Growth'
            </motion.p>
          </div>
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
