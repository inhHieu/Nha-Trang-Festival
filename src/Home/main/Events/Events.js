import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Events.scss";
import pic from "../../../asses/fes1.jpg";
function Events() {
  //APIs call
  useEffect(() => {
    getCategories();
  }, []);

  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8008/api/categories");
      setCategories(response.data);
      console.log("got data");
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //----------------------------------------------------------------
  /// animation

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        bounce: 0,
        staggerChildren: 0.15,
      },
    },
  };
  const EventName = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        bounce: 0,
        delay: 0.8,
        ease: "linear",
      },
    },
  };
  // function navigation() {
  //   console.log("clicked");
  //   // navigate("/Detail/New", { state: { id: id } });
  // }

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    console.log(inView)
    if (inView) {
      control.start("show");
    }
  }, [control, inView]);

  return (
    <div className="Events-wrap">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={control}
        className="Events"
      >
        {loadings &&
          categories.map((category) => (
            <motion.div className="Event" variants={item}>
              <img src={pic} alt=""></img>
              <div className="Shadow"></div>
              <motion.p variants={EventName} className="EventName">
                {category.categoryName}
              </motion.p>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}

export default Events;
