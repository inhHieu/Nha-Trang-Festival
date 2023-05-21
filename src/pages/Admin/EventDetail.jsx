import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [waiting, setWaiting] = useState(true);
  const [deleting, setDeleting] = useState(true);
  const [token, setToken] = useState();
  const [showModal, setShowModal] = useState(false);

  const buttonSubmitRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);
  
  const deleteEvent = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:8008/api/admin/adminevents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDeleting(false);
      setShowModal(false);
      navigate("/Admin/Events")
      console.log("deleted");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents(response.data);
      setLoadings(false);
      console.log("got data");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  useEffect(() => {
    if (token) getEvents();
  }, [token]);


  // from handlers
  const formik = useFormik({
    initialValues: {
      eventId: events.eventId,
      categoryId: events.categoryId,
      eventName: events.eventName,
      eventDescription: events.eventDescription,
      summary: events.summary,
      takePlace: events.takePlace,
      dateStart: events.dateStart,
      imageUrl: events.imageUrl,
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
        const response = await axios.put(
          `http://localhost:8008/api/admin/adminevents/${id}`,
          JSON.stringify({
            categoryId: values.categoryId,
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
  
  return (
    <main className="w-full h-screen overflow-clip overflow-y-auto grid place-items-center text-08 font-bold">
      <AnimatePresence>
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
        {!loadings && (
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
                <input
                  className="bg-white-blue font-normal rounded-md border-2 border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="categoryId"
                  id="categoryId"
                  value={formik.values.categoryId}
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
                formik.touched.eventDescription &&
                formik.errors.eventDescription
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
        )}
      </section>
    </main>
  );
}

export default EventDetail;
