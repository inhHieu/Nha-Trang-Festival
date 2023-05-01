import React from "react";
import bg1 from "../../../asses/beach1.jpg";
import bg2 from "../../../asses/fes1.jpg";
import bg3 from "../../../asses/LotusTower.jpg";
import {
  motion,
  useTransform,
  useScroll,
} from "framer-motion";
function Activitives() {
  const { scrollYProgress } = useScroll();
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.33, 0.45, 0.5, 1],
    [0, 0, 1, 1, 0, 0]
  );
  //   const opacity1 = useTransform(
  //     scrollYProgress,
  //     [0, 0.1, 0.13, 0.25, 0.3, 1],
  //     [0, 0, 1, 1, 0, 0]
  //   );
  const opacity1a = useTransform(
    scrollYProgress,
    // [0, 0.15, 0.2, 0.25, 0.3, 1],
    [0, 0.35, 0.4, 0.45, 0.5, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    // [0, 0.3, 0.33, 0.45, 0.5, 1],
    // [0, 0, 0.13, 0.25, 0.3, 1],
    [0, 0.3, 0.33, 0.45, 0.5, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const y1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.33, 0.45, 0.5, 1],
    // ["-40rem", "-40rem", "-20rem", "-1rem", "-1rem", "-20rem"]
    ["3rem", "3rem", "-1rem", "-1rem", "-3rem", "-20rem"]
  );
  const y1a = useTransform(
    scrollYProgress,
    [0, 0.35, 0.4, 0.45, 0.5, 1],
    ["3rem", "3rem", "-1rem", "-1rem", "-3rem", "-20rem"]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.33, 0.45, 0.5, 1],
    ["-5rem", "0rem", "0rem", "0rem", "20rem", "20rem"]
  );
  const rolate1 = useTransform(
    scrollYProgress,
    [0, 0.34, 0.37, 0.45, 0.5, 1],
    [0, 0, 15, 15, 0, 0]
  );
  const rolate2 = useTransform(
    scrollYProgress,
    [0, 0.34, 0.37, 0.45, 0.5, 1],
    [0, 0, -15, -15, 0, 0]
  );

  return (
    <div className="section-wrapper">
      <section className="section section2">
        <div className="text-group">
          <motion.div
            className="left-text "
            style={{ opacity: opacity1, y: y1 }}
          >
            <span>Events</span>
            <span>More than 60 events</span>
            <span>60+</span>
            <span>Taking place from 3-6 June</span>
          </motion.div>
          <motion.p style={{ opacity: opacity1a, y: y1a }}>
            <span> Over 60+</span> various events
            <br /> Designed to appeal to all ages and interests
          </motion.p>
        </div>
        <motion.div
          className="image-group"
          style={{ opacity: opacity2, y: y2 }}
        >
          <motion.div className="image-wrap" style={{ rotate: rolate1 }}>
            <img src={bg1} alt="" />
          </motion.div>
          <motion.div className="image-wrap">
            <img src={bg2} alt="" />
          </motion.div>
          <motion.div className="image-wrap" style={{ rotate: rolate2 }}>
            <img src={bg3} alt="" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Activitives;
