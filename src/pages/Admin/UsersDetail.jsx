import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {API_BASE_URL} from "../../Api/BaseUrl"
import LoaderFullSC from "../../component/loaderFullSC";
import Success from "../../component/Success.jsx";
import defAvatar from "../../../src/asses/defaultAvatar.jpg"

function UsersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [status, setStatus] = useState(false);
  const [deleting, setDeleting] = useState(true);
  const [token, setToken] = useState();
  const [showModal, setShowModal] = useState(false);

  const buttonSubmitRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const deleteUser = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/adminusers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDeleting(false);
      setShowModal(false);
      navigate("/Admin/Users");
      console.log("deleted");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/adminusers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data);
      setLoadings(false);
      // console.log(response.data);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  useEffect(() => {
    if (token) getUsers();
  }, [token]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // from handlers
  const formik = useFormik({
    initialValues: {
      user_ID: user.user_ID,
      roleId: user.roleId,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      email: user.email,
      password: user.password,
      sex: user.sex,
      age: user.age,
      avatar: user.avatar,
    },
    enableReinitialize: true,
    //validations
    validationSchema: Yup.object({
      roleId: Yup.number()
        .required("Category ID must not be empty")
        .positive()
        .typeError("Category ID must be a number"),
      firstName: Yup.string(),
      lastName: Yup.string(),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
      address: Yup.string(),
      email: Yup.string().email().required("Date start must not be empty"),
      password: Yup.string().required("Image Url must not be empty"),
      sex: Yup.string(),
      age: Yup.date(),
      avatar: Yup.string(),
    }),
    onSubmit: async (values) => {
      buttonSubmitRef.current.focus();
      console.log("onSubmit", values);
      const isTrueSet = values.sex?.toLowerCase?.() === "true";
       
      setWaiting(true);
      try {
        const response = await axios.put(
          `${API_BASE_URL}/admin/adminusers/${id}`,
           {
            roleId: values.roleId,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: values.address,
            email: values.email,
            password: values.password,
            sex: isTrueSet,
            age: values.age,
            avatar: values.avatar,
          } ,
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
    deleteUser();
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
              {/* =========================user_ID================================  */}
              <label
                htmlFor="user_ID"
                className={
                  formik.touched.user_ID && formik.errors.user_ID
                    ? " w-2/12 text-red-500"
                    : " w-2/12"
                }
              >
                {formik.touched.user_ID && formik.errors.user_ID
                  ? formik.errors.user_ID
                  : "User ID"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="user_ID"
                  id="user_ID"
                  disabled="disabled"
                  value={formik.values.user_ID}
                  onChange={formik.handleChange}
                />
              </label>
              {/* =========================roleId================================  */}
              <label
                htmlFor="roleId"
                className={
                  formik.touched.roleId && formik.errors.roleId
                    ? " w-2/12 text-red-500"
                    : " w-2/12"
                }
              >
                {formik.touched.roleId && formik.errors.roleId
                  ? formik.errors.roleId
                  : "Role ID"}
                <br />
                <select
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="roleId"
                  id="roleId"
                  value={formik.values.roleId}
                  onChange={formik.handleChange}
                >
                  <option value={1}>Admin</option>
                  <option value={2}>Moderator</option>
                  <option value={3}>User</option>
                </select>
              </label>
              {/* ==============================age===========================  */}
              <label
                htmlFor="age"
                className={
                  formik.touched.age && formik.errors.age
                    ? " w-2/12 text-red-500"
                    : " w-2/12"
                }
              >
                {formik.touched.age && formik.errors.age
                  ? formik.errors.age
                  : "Age"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="age"
                  id="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
            <div className="row flex justify-between">
              {/* ==========================firstName=============================  */}
              <label
                htmlFor="firstName"
                className={
                  formik.touched.firstName && formik.errors.firstName
                  ? "w-4/12  text-red-500"
                  : "w-4/12  "
                }
              >
                {formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : "First Name"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </label>
              {/* ==========================lastName=============================  */}
              <label
                htmlFor="lastName"
                className={
                  formik.touched.lastName && formik.errors.lastName
                    ? "w-4/12  text-red-500"
                    : "w-4/12  "
                }
              >
                {formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : "Last Name"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </label>
              {/* ==============================phone===========================  */}
              <label
                htmlFor="phone"
                className={
                  formik.touched.phone && formik.errors.phone
                    ? " w-2/12 text-red-500"
                    : " w-2/12"
                }
              >
                {formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : "Phone"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
            <div className="row flex justify-between">
              {/* =============================address=========================  */}
              <label
                htmlFor="address"
                className={
                  formik.touched.address && formik.errors.address
                    ? "w-9/12 text-red-500"
                    : "w-9/12 "
                }
              >
                {formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : "Address"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="address"
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </label>
              {/* ==============================sex===========================  */}
              <label
                htmlFor="sex"
                className={
                  formik.touched.sex && formik.errors.sex
                    ? " w-2/12 text-red-500"
                    : " w-2/12"
                }
              >
                {formik.touched.sex && formik.errors.sex
                  ? formik.errors.sex
                  : "Sex"}
                <br />
                <select
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="sex"
                  id="sex"
                  value={formik.values.sex}
                  onChange={formik.handleChange}
                >
                  <option value={"true"}>Male</option>
                  <option value={"false"}>Female</option>
                </select>
              </label>
            </div>
            <div className="flex justify-between">
              {/* =============================email===========================  */}
              <label
                htmlFor="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? "w-9/12 text-red-500"
                    : "w-9/12 "
                }
              >
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Email"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </label>

              {/* ==============================password===========================  */}
              <label
                htmlFor="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? " w-2/12 text-red-500"
                    : " w-2/12"
                }
              >
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Password"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
            <dir className="flex justify-between">
              {/* ==============================avatar===========================  */}
              <label
                htmlFor="avatar"
                className={
                  formik.touched.avatar && formik.errors.avatar
                    ? " w-9/12 text-red-500"
                    : " w-9/12 "
                }
              >
                {formik.touched.avatar && formik.errors.avatar
                  ? formik.errors.avatar
                  : "Avatar Url"}
                <br />
                <input
                  className="bg-white-blue font-normal rounded-md border-2 w-full border-gray-200 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                  type="text"
                  name="avatar"
                  id="avatar"
                  value={formik.values.avatar}
                  onChange={formik.handleChange}
                />
              </label>

              <div className=" w-2/12 aspect-square rounded-md overflow-clip  ">
                <img
                  className="w-full h-full object-cover"
                  src={formik.values.avatar == ""? defAvatar : formik.values.avatar}
                  alt=""
                />
              </div>
            </dir>
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

export default UsersDetail;
