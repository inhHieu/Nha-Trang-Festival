import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {API_BASE_URL} from "../../Api/BaseUrl"
import LoaderFullSC from "../../component/loaderFullSC";
import Success from "../../component/Success.jsx";
import CategoriesDropdown from "../../component/Admin/CategoryDropdown";

function EventEventAdd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadings, setLoadings] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [status, setStatus] = useState(false);
  const [token, setToken] = useState();
  const [showModal, setShowModal] = useState(false);

  const buttonSubmitRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);
  const formik = useFormik({
    initialValues: {
      eventId: "Auto Generated",
      categoryId: 2,
      eventName: "",
      eventDescription: "",
      summary: "",
      takePlace: "",
      dateStart: "",
      imageUrl: "",
    },
    enableReinitialize: true,
    //validations
    validationSchema: Yup.object({
      categoryId: Yup.number()
        .required("Category ID must not be empty")
        .positive()
        .typeError("Category ID must be a number"),
      eventName: Yup.string().required("Event name must not be empty"),
      eventDescription: Yup.string().required("Description must not be empty"),
      summary: Yup.string().required("Summary must not be empty"),
      takePlace: Yup.string().required("Take place must not be empty"),
      dateStart: Yup.string().required("Date start must not be empty"),
      imageUrl: Yup.string().required("Image Url must not be empty"),
    }),
    onSubmit: async (values) => {
      buttonSubmitRef.current.focus();
      console.log("onSubmit", values);
      setWaiting(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/admin/adminevents`,
          JSON.stringify({
            categoryId: selected,
            eventName: values.eventName,
            eventDescription: values.eventDescription,
            summary: values.summary,
            takePlace: values.takePlace,
            dateStart: values.dateStart,
            imageUrl: values.imageUrl,
          }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setWaiting(false);
        console.log(response.data);
        if (Number(response.data) && response.data >= 1) {
          setStatus(true);
          //wait 2s then navigate to
          setTimeout(() => {
            navigate("/Admin/Events");
          }, 1000);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    },
  });

  function deleteHandler() {
    setShowModal(true);
  }
  function confirmHandler() {
    deleteEvent();
  }
  const [selected, setSelected] = useState("");
  const handleDropdownSelect = (value) => {
    setSelected(value);
    formik.values.categoryId = value; // false, need fix
  };
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
                    🗑️Delete this news?
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
        <form
          method="post"
          className=" flex flex-col gap-2  "
          onSubmit={formik.handleSubmit}
        >
          <div className="row flex flex-wrap justify-between  ">
            {/* =========================eventID================================  */}
            <label
              htmlFor="eventId"
              className={
                formik.touched.eventId && formik.errors.eventId
                  ? "text-red-500"
                  : ""
              }
            >
              {formik.touched.eventId && formik.errors.eventId
                ? formik.errors.eventId
                : "Event ID"}
              <br />
              <input
                className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="eventId"
                id="eventId"
                disabled="disabled"
                value={formik.values.eventId}
                onChange={formik.handleChange}
              />
            </label>
            {/* =========================categoryID================================  */}
            <label
              htmlFor="categoryId"
              className={
                formik.touched.categoryId && formik.errors.categoryId
                  ? "text-red-500"
                  : ""
              }
            >
              {formik.touched.categoryId && formik.errors.categoryId
                ? formik.errors.categoryId
                : "Category ID"}
              <br />
              <CategoriesDropdown
                token={token}
                id={formik.values.categoryId}
                onSelect={handleDropdownSelect}
                onChange={formik.handleChange}
              />
            </label>
            {/* ==============================date===========================  */}
            <label
              htmlFor="dateStart"
              className={
                formik.touched.dateStart && formik.errors.dateStart
                  ? "text-red-500"
                  : ""
              }
            >
              {formik.touched.dateStart && formik.errors.dateStart
                ? formik.errors.dateStart
                : "Date Start"}
              <br />
              <input
                className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="dateStart"
                id="dateStart"
                value={formik.values.dateStart}
                onChange={formik.handleChange}
              />
            </label>
          </div>
          <div className="row flex justify-between">
            {/* ==========================Name=============================  */}
            <label
              htmlFor="eventName"
              className={
                formik.touched.eventName && formik.errors.eventName
                  ? "w-9/12 text-red-500"
                  : "w-9/12 "
              }
            >
              {formik.touched.eventName && formik.errors.eventName
                ? formik.errors.eventName
                : "Event Name"}
              <br />
              <input
                className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="eventName"
                id="eventId"
                value={formik.values.eventName}
                onChange={formik.handleChange}
              />
            </label>
            {/* ==============================takeplace===========================  */}
            <label
              htmlFor="takePlace"
              className={
                formik.touched.takePlace && formik.errors.takePlace
                  ? "text-red-500"
                  : ""
              }
            >
              {formik.touched.takePlace && formik.errors.takePlace
                ? formik.errors.takePlace
                : "Take Place"}
              <br />
              <input
                className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="takePlace"
                id="takePlace"
                value={formik.values.takePlace}
                onChange={formik.handleChange}
              />
            </label>
          </div>
          {/* =============================description=========================  */}
          <label
            htmlFor="eventDescription"
            className={
              formik.touched.eventDescription && formik.errors.eventDescription
                ? "text-red-500"
                : ""
            }
          >
            {formik.touched.eventDescription && formik.errors.eventDescription
              ? formik.errors.eventDescription
              : "Event Description"}
            <br />
            <textarea
              className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
              type="text"
              name="eventDescription"
              id="eventDescription"
              rows={4}
              value={formik.values.eventDescription}
              onChange={formik.handleChange}
            />
          </label>
          {/* =============================summary===========================  */}
          <label
            htmlFor="summary"
            className={
              formik.touched.summary && formik.errors.summary
                ? "text-red-500"
                : ""
            }
          >
            {formik.touched.summary && formik.errors.summary
              ? formik.errors.summary
              : "Summary"}
            <br />
            <textarea
              className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
              type="text"
              name="summary"
              id="summary"
              rows={2}
              value={formik.values.summary}
              onChange={formik.handleChange}
            />
          </label>

          {/* ==============================img===========================  */}
          <label
            htmlFor="imageUrl"
            className={
              formik.touched.imageUrl && formik.errors.imageUrl
                ? "text-red-500"
                : ""
            }
          >
            {formik.touched.imageUrl && formik.errors.imageUrl
              ? formik.errors.imageUrl
              : "Image Url"}
            <br />
            <input
              className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
            />
          </label>
          <div className="h-36 w-36 rounded-md overflow-clip">
            <img
              className="w-full h-full object-cover"
              src={formik.values.imageUrl}
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
      </section>
    </main>
  );
}

export default EventEventAdd;
