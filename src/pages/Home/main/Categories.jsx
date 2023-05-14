import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import ViewAll from "../../../component/ViewAll";
import "../../../style/pages/Home/main/Categories.scss";
import pic from "../../../asses/fes1.jpg";
function Events() {
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(true);
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
  //----------------------------------------------------------------
  /// animation

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
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
        type: "spring",
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
        type: "spring",
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
  }, [inView]);
  if (loadings) {
    return (
      <div className="Categories-wrap">
        <div className="Categories">
          loading
        </div>
      </div>
    );
  }
  return (
    <div className="Categories-wrap">
      <div className="mt-20 mb-7 w-full flex justify-end">
        <ViewAll link={"/Categories/1?event=false"}>View all</ViewAll>
      </div>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={control}
        className="Categories "
      >
        {!loadings &&
          categories.map((category) => (
            <Link
              // state={{ newsID: category.category_Id }}
              to={`/Categories/${category.category_Id}`}
              key={category.category_Id}
            >
              <motion.div className="Category" variants={item}>
                <img src={category.image} alt=""></img>
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
