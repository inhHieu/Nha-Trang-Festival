import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import LoaderFullSC from "../../component/loaderFullSC";
import Success from "../../component/Success.jsx";

function CategoriesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [status, setStatus] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [deleting, setDeleting] = useState(true);
  const [token, setToken] = useState();
  const [showModal, setShowModal] = useState(false);

  const buttonSubmitRef = useRef();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const deleteCategories = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:8008/api/admin/admincategories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDeleting(false);
      setShowModal(false);
      navigate("/Admin/Categories");
      console.log("deleted");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const getcategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/admincategories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(response.data);
      setLoadings(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  useEffect(() => {
    if (token) getcategories();
  }, [token]);

  const formik = useFormik({
    initialValues: {
      category_Id: categories.category_Id,
      categoryName: categories.categoryName,
      categoryDescription: categories.categoryDescription,
      image: categories.image,
      totalNews: categories.totalNews,
      totalEvents: categories.totalEvents,
      totalSubscribers: categories.totalSubscribers,
    },
    enableReinitialize: true,
    //validations
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category Name must not be empty"),
      categoryDescription: Yup.string().required(
        "Categories Description name must not be empty"
      ),
      image: Yup.string().required("Image Url must not be empty"),
    }),
    onSubmit: async (values) => {
      buttonSubmitRef.current.focus();
      setWaiting(true);
      try {
        const response = await axios.put(
          `http://localhost:8008/api/admin/admincategories/${id}`,
          JSON.stringify({
            categoryName: values.categoryName,
            categoryDescription: values.categoryDescription,
            image: values.image,
          }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setWaiting(false);
        if (Number(response.data) && response.data == 1) {
          setStatus(true);
          setTimeout(() => {
          setStatus(false);
          }, 1000)
        }
      } catch (error) {
        console.log("Error: " + error.message);
        setWaiting(false);
      }
    },
  });

  function deleteHandler() {
    setShowModal(true);
  }
  function confirmHandler() {
    deleteCategories();
  }

  return (
    <main className="w-full h-screen overflow-clip overflow-y-auto grid place-items-center text-08 font-bold">
      <AnimatePresence>
        {status && <Success />}
        {waiting && <LoaderFullSC />}
        {showModal && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                translateX: "50%",
                translateY: "50%",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                translateX: "-50%",
                translateY: "-50%",
              }}
              exit={{
                opacity: 0,
                scale: 0,
                translateX: "50%",
                translateY: "50%",
              }}
              className="modal fixed w-56 h-36 top-1/2 left-1/2 border border-gray-100 rounded-md overflow-clip bg-white shadow-2xl"
            >
              <div className="bg-red-500 w-full h-2"></div>
              <section className="flex flex-col justify-around w-full h-full text-center">
                <div className="text">
                  <p className="text-red-500 text-[1.1rem]">
                    🗑️Delete this Category?
                  </p>
                  <p className="text-gray-500 text-06 font-thin mt-1 ">
                    This action can't be undone
                  </p>
                </div>
                <div className="row flex w-full justify-around">
                  <button
                    className="bg-def-gray px-2 py-1 rounded-[0.25rem] "
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 rounded-[0.25rem] text-white "
                    onClick={() => confirmHandler()}
                  >
                    Delete
                  </button>
                </div>
              </section>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <section className="w-11/12 p-4 ">
        {!loadings && (
          <form
            method="post"
            className=" flex flex-col gap-2  "
            onSubmit={formik.handleSubmit}
          >
            <div className="row flex flex-wrap justify-between  ">
              {/* =========================category_Id================================  */}
              <label
                htmlFor="category_Id"
                className={
                  formik.touched.category_Id && formik.errors.category_Id
                    ? "text-red-500"
                    : ""
                }
              >
                {formik.touched.category_Id && formik.errors.category_Id
                  ? formik.errors.category_Id
                  : "Category ID"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="category_Id"
                  id="category_Id"
                  disabled="disabled"
                  value={formik.values.category_Id}
                  onChange={formik.handleChange}
                />
              </label>
              {/* =========================totalNews================================  */}
              <label
                htmlFor="totalNews"
                className={
                  formik.touched.totalNews && formik.errors.totalNews
                    ? "text-red-500"
                    : ""
                }
              >
                {formik.touched.totalNews && formik.errors.totalNews
                  ? formik.errors.totalNews
                  : "Total News"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="totalNews"
                  id="totalNews"
                  disabled="disabled"
                  value={formik.values.totalNews}
                  onChange={formik.handleChange}
                />
              </label>
              {/* ==============================totalEvents===========================  */}
              <label
                htmlFor="totalEvents"
                className={
                  formik.touched.totalEvents && formik.errors.totalEvents
                    ? "text-red-500"
                    : ""
                }
              >
                {formik.touched.totalEvents && formik.errors.totalEvents
                  ? formik.errors.totalEvents
                  : "Total Events"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="totalEvents"
                  id="totalEvents"
                  disabled="disabled"
                  value={formik.values.totalEvents}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
            <div className="row flex justify-between">
              {/* ==========================categoryName=============================  */}
              <label
                htmlFor="categoryName"
                className={
                  formik.touched.categoryName && formik.errors.categoryName
                    ? "w-9/12 text-red-500"
                    : "w-9/12 "
                }
              >
                {formik.touched.categoryName && formik.errors.categoryName
                  ? formik.errors.categoryName
                  : "Category Name"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                />
              </label>
              {/* ==============================totalSubscribers===========================  */}
              <label
                htmlFor="totalSubscribers"
                className={
                  formik.touched.totalSubscribers &&
                  formik.errors.totalSubscribers
                    ? "text-red-500"
                    : ""
                }
              >
                {formik.touched.totalSubscribers &&
                formik.errors.totalSubscribers
                  ? formik.errors.totalSubscribers
                  : "Total Subscribers"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="totalSubscribers"
                  disabled="disabled"
                  id="totalSubscribers"
                  value={formik.values.totalSubscribers}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
            {/* =============================categoryDescription=========================  */}

            <label
              htmlFor="categoryDescription"
              className={
                formik.touched.categoryDescription &&
                formik.errors.categoryDescription
                  ? "text-red-500"
                  : ""
              }
            >
              {formik.touched.categoryDescription &&
              formik.errors.categoryDescription
                ? formik.errors.categoryDescription
                : "Category Description"}
              <br />
              <textarea
                className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="categoryDescription"
                id="categoryDescription"
                rows={4}
                value={formik.values.categoryDescription}
                onChange={formik.handleChange}
              />
            </label>

            {/* ==============================image===========================  */}
            <label
              htmlFor="image"
              className={
                formik.touched.image && formik.errors.image
                  ? "text-red-500"
                  : ""
              }
            >
              {formik.touched.image && formik.errors.image
                ? formik.errors.image
                : "Image Url"}
              <br />
              <input
                className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="image"
                id="image"
                value={formik.values.image}
                onChange={formik.handleChange}
              />
            </label>
            <div className="h-36 w-36 rounded-md overflow-clip">
              <img
                className="w-full h-full object-cover"
                src={formik.values.image}
                alt=""
              />
            </div>
            <div className="flex justify-around mt-8 ">
              <button
                ref={buttonSubmitRef}
                className="bg-green-400  px-4 py-1 rounded-md hover:bg-green-500 duration-300 "
                type="submit"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-sky-400 px-4 py-1 rounded-md hover:bg-sky-500 duration-300 "
                onClick={() => formik.resetForm()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-400 px-4 py-1 rounded-md hover:bg-red-500 duration-300 "
                onClick={() => deleteHandler()}
              >
                Delete
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

export default CategoriesDetail;
