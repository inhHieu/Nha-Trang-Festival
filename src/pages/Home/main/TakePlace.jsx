import React  from "react";
import bg from "../../../asses/LotusTower.jpg";
import {
  motion,
  useTransform,
  useScroll,
  // useMotionValueEvent,
} from "framer-motion";

function TakePlace( refa) {
//   const targetref = useRef();
  const { scrollYProgress } = useScroll( );
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Page scroll: ", latest);
  // });
//   const opacity1 = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
  const y1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    ["3rem", "3rem", "-1rem", "-1rem", "-3rem", "-20rem"]
  );
  const y1a = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.25, 0.3, 1],
    ["3rem", "3rem", "-1rem", "-1rem", "-3rem", "-20rem"]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.13, 0.25, 0.3, 1],
    ["-5rem", "0rem", "0rem", "0rem", "20rem", "20rem"]
  );

  return (
    <div  className="section-wrapper">
      <section className="section section1">
        <div className="text-group">
          <motion.div
            className="left-text "
            style={{ opacity: opacity1, y: y1 }}
          >
            <span>Summer</span>
            <span>Every 2 years </span>
            <span>At</span>
            <span>Nha Trang, Viet Nam</span>
          </motion.div>
          <motion.p style={{ opacity: opacity1a, y: y1a }}>
            <span>Free</span> to join for erveryone <br /> With the theme 
            'Khanh Hoa - Hope and Growth'
          </motion.p>
        </div>
        <motion.div
          className="image-wrap"
          style={{ opacity: opacity2, y: y2 }}
        >
          <img src={bg} alt="" />
        </motion.div>
      </section>
    </div>
  );
}

export default TakePlace;
