import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ViewAll from "../../../component/ViewAll";
function Events() {
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(true);
  //APIs call
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8008/api/categories");
      setCategories(response.data);
      setLoadings(false);
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
      <div className="flex flex-col gap-2 w-60 mt-[8.3rem] mb-7 animate-pulse ">
        <div className=" w-full h-20 rounded-lg bg-def-gray"></div>
        <div className=" w-full h-20 rounded-lg bg-def-gray"></div>
        <div className=" w-full h-20 rounded-lg bg-def-gray"></div>
        <div className=" w-full h-20 rounded-lg bg-def-gray"></div>
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
        className="Categories flex flex-col gap-2 w-60 "
      >
        {!loadings &&
          categories.map((category) => (
            <Link
              // state={{ newsID: category.category_Id }}
              to={`/Categories/${category.category_Id}`}
              key={category.category_Id}
            >
              <motion.div
                className="Category group relative w-full h-20 b-4 rounded-lg overflow-clip cursor-pointer"
                variants={item}
              >
                <img
                  src={category.image}
                  className="w-full h-full object-cover object-center scale-105 duration-300 group-hover:scale-100"
                  alt=""
                ></img>
                <div className=" absolute top-0 w-3/4 h-full bg-gradient-to-r from-black to-black/0"></div>
                <motion.p
                  variants={CategoriesName}
                  className="CategoriesName absolute w-2/4 inset-y-3 left-3 
                  text-white text-[1.2rem] font-bold tracking-widest duration-300
                  group-hover:left-5"
                >
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
