import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../style/pages/Home/main/Categories.scss";
import pic from "../../../asses/fes1.jpg";
function Events() {
  //APIs call
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8008/api/categories");
      setCategories(response.data);
      console.log("got data1");
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);
  //----------------------------------------------------------------
  /// animation

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type:'spring',
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
        type:'spring',
        duration: 0.8,
        bounce: 0,
        staggerChildren: 0.15,
      },
    },
  };
  const CategoriesName = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type:'spring',
        duration: 0.5,
        bounce: 0,
        delay: 0.8,
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
    console.log(inView);
    if (inView) {
      control.start("show");
    }
  }, [ inView]);

  return (
    <div className="Categories-wrap">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={control}
        className="Categories"
      >
        {loadings &&
          categories.map((category) => (
            <Link
              state={{ newsID: category.category_ID }}
              to="/Categories"
              key={category.category_ID}
            >
              <motion.div className="Category" variants={item}>
                <img src={pic} alt=""></img>
                <div className="Shadow"></div>
                <motion.p variants={CategoriesName} className="CategoriesName">
                  {category.categoryName}
                </motion.p>
              </motion.div>
            </Link>
          ))}
      </motion.div>
    </div>
  );
}

export default Events;
