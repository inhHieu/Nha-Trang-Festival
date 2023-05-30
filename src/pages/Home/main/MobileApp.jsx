import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import bg from "../../../asses/mobileApp.jpg";

function MobileApp() {
  const { scrollYProgress } = useScroll();
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.5, 0.53, 0.65, 0.7, 1],
    [0, 0, 1, 1, 1, 1]
  );
  // [0, 0.3, 0.33, 0.45, 0.5, 1],
  // [0, 0, 1, 1, 0, 0]
  const opacity1a = useTransform(
    scrollYProgress,
    // [0, 0.15, 0.2, 0.25, 0.3, 1],
    // [0, 0.35, 0.4, 0.45, 0.5, 1],
    [0, 0.5, 0.53, 0.65, 0.7, 1],
    [0, 0, 1, 1, 1, 1]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    // [0, 0, 0.13, 0.25, 0.3, 1],
    // [0, 0.3, 0.33, 0.45, 0.5, 1],
    [0, 0.5, 0.53, 0.65, 0.7, 1],
    [0, 0, 1, 1, 1, 1]
  );
  const y1 = useTransform(
    scrollYProgress,
    // [0, 0.3, 0.33, 0.45, 0.5, 1],
    [0, 0.5, 0.53, 0.56, 0.59, 0.7, 1],
    // ["-40rem", "-40rem", "-20rem", "-1rem", "-1rem", "-20rem"]
    ["10rem", "0rem", "20rem", "30rem", "40rem", "42rem", "42rem"]  );
  const y1a = useTransform(
    scrollYProgress,
    // [0, 0.35, 0.4, 0.45, 0.5, 1],
    [0, 0.5, 0.53, 0.56, 0.59, 0.7, 1],
    ["10rem", "0rem", "20rem", "30rem", "40rem", "42rem", "42rem"]  );
  const y2 = useTransform(
    scrollYProgress,
    // [0, 0.3, 0.33, 0.45, 0.5, 1],
    [0, 0.5, 0.53, 0.56, 0.59, 0.7, 1],
    ["10rem", "0rem", "20rem", "30rem", "40rem", "42rem", "42rem"]
  );

  return (
    <div className="section-wrapper -z-20">
      <section className="section section3">
        <div className="text-group">
          <motion.div
            className="left-text "
            style={{ opacity: opacity1, y: y1 }}
          >
            <span>Mobile</span>
            <span>Ready to go with </span>
            <span>App</span>
            <span>Nha Trang Festival app</span>
          </motion.div>
          <motion.p style={{ opacity: opacity1a, y: y1a }}>
            <span>Install App</span> Nha Trang Festival for your Android and IOS{" "}
            <br />
            To get the latest updates, location, time and everything
          </motion.p>
        </div>
        <motion.div className="image-wrap" style={{ opacity: opacity2, y: y2 }}>
          <img src={bg} alt="" />
        </motion.div>
      </section>
    </div>
  );
}

export default MobileApp;
