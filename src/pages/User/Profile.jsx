import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { parse, isDate } from "date-fns";

import {API_BASE_URL} from "../../Api/BaseUrl"
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile({ userInfos }) {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [waiting, setWaiting] = useState(false);
  const [token, setToken] = useState();

  const refPasswords = useRef(null);
  const refIcon = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user-info"));
    setId(data.user.user_ID);
    setToken(data.token);
    console.log(data.token);
  }, []);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      fname: userInfos.firstName,
      lname: userInfos.lastName,
      dob: userInfos.age.slice(0, -9),
      address: userInfos.address,
      email: userInfos.email,
      password: userInfos.password,
      phone: userInfos.phone,
      sex: userInfos.sex,
      avatar: userInfos.avatar,
    },
    enableReinitialize: true,
    //validation
    validationSchema: Yup.object({
      fname: Yup.string().max(30, "Name must be 30 characters or less"),
      lname: Yup.string().max(30, "Name must be 30 characters or less"),
      dob: Yup.date()
        .transform(function (value, originalValue) {
          if (this.isType(value)) {
            return value;
          }
          const result = parse(originalValue, "dd/MM/yyyy", new Date());
          return result;
        })
        .typeError("please enter a valid date")
        .required()
        .min("01/01/1888", "Date is not valid"),
      address: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required(),
      phone: Yup.string()
        .max(20, "Phone number must be 20 digits or less")
        .matches(phoneRegExp, "Phone number is not valid"),
    }),

    onSubmit: async (values) => {
      setWaiting(true);
      const isTrueSet = values.sex?.toLowerCase?.() === "true";
      console.log(values, isTrueSet);
      try {
        const response = await axios.put(
          `${API_BASE_URL}/users/${id}`,
          JSON.stringify({
            user_ID: id,
            firstName: values.fname,
            lastName: values.lname,
            phone: values.phone,
            address: values.address,
            email: values.email,
            password: values.password,
            sex: isTrueSet,
            age: values.dob + "T00:00:00",
            avatar: values.avatar,
          }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setWaiting(false);
        console.log(response.status);
        if (response.status == 200) {
          setActive(false);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    },
  });

  //edit user info
  const [active, setActive] = useState();
  const [edit, setEdit] = useState();
  useEffect(() => {
    if (edit) setActive(true);
    else {
      formik.resetForm();
      setActive(false);
    }
  }, [edit]);
  //logout
  const logout = () => {
    localStorage.removeItem("user-info");
    localStorage.removeItem("user-sub");
    // setUserInfo([]);
    navigate("/");
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      formik.setFieldValue("avatar", fileUrl);
    },
    [formik]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <motion.div
      className="user-info flex flex-col w-full items-center lg:justify-around lg:items-start lg:flex-row "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        {...getRootProps()}
        className="relative drop-img cursor-pointer"
      >
        <input {...getInputProps()} onChange={formik.handleChange} />

        <p className="absolute w-full h-full top-0 grid place-items-center text-09">
          Drop the image here ...
        </p>

        {formik.values.avatar != userInfos.avatar ? (
          <img
            src={formik.values.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
      <form
        className="information-form w-full h-[25rem] flex flex-col gap-4 lg:w-1/2 "
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between gap-8 ">
          {/*------------------------fname------------------------ */}
          <label
            htmlFor="dname"
            className={
              formik.touched.fname && formik.errors.fname ? "error" : ""
            }
          >
            {formik.touched.fname && formik.errors.fname
              ? formik.errors.fname
              : "First Name"}

            <input
              type="text"
              id="fname"
              name="fname"
              className={active ? "active-input" : ""}
              disabled={!active}
              value={formik.values.fname}
              onChange={formik.handleChange}
            ></input>
          </label>
          {/*------------------------lname------------------------ */}
          <label
            htmlFor="lname"
            className={
              formik.touched.lname && formik.errors.lname ? "error" : ""
            }
          >
            {formik.touched.lname && formik.errors.lname
              ? formik.errors.lname
              : "Last Name"}

            <input
              type="text"
              id="lname"
              name="lname"
              className={active ? "active-input" : ""}
              disabled={!active}
              value={formik.values.lname}
              onChange={formik.handleChange}
            ></input>
          </label>
        </div>
        <div className="flex justify-between gap-8 ">
          {/*------------------------dob------------------------ */}
          <label
            htmlFor="dob"
            className={formik.touched.dob && formik.errors.dob ? "error" : ""}
          >
            {formik.touched.dob && formik.errors.dob
              ? formik.errors.dob
              : "Day of Birth"}

            <input
              placeholder="dd/MM/yyyy"
              type="text"
              id="dob"
              name="dob"
              className={active ? "active-input" : ""}
              disabled={!active}
              value={formik.values.dob}
              onChange={formik.handleChange}
            ></input>
          </label>
          {/*------------------------sex------------------------ */}
          <label
            htmlFor="sex"
            className={formik.touched.sex && formik.errors.sex ? "error" : ""}
          >
            {formik.touched.sex && formik.errors.sex
              ? formik.errors.sex
              : "Sex"}

            <select
              id="sex"
              name="sex"
              className={
                "w-full h-[1.7rem] px-2 border bg-white-blue border-gray-400 rounded-[7px] " +
                (active ? " active-input" : "")
              }
              disabled={!active}
              value={formik.values.sex}
              onChange={formik.handleChange}
            >
              <option value={"true"}>Male</option>
              <option value={"false"}>Female</option>
            </select>
          </label>
        </div>

        <div className="flex justify-between gap-8 ">
          {/*------------------------phone------------------------ */}
          <label
            htmlFor="phone"
            className={
              formik.touched.phone && formik.errors.phone ? "error" : ""
            }
          >
            {formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : "Phone"}

            <input
              type="text"
              id="phone"
              name="phone"
              className={active ? "active-input" : ""}
              disabled={!active}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </label>
          {/*------------------------password------------------------ */}
          <label
            htmlFor="password"
            className={
              "relative" +
              (formik.touched.password && formik.errors.password ? "error" : "")
            }
          >
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password"}

            <input
              ref={refPasswords}
              type="password"
              id="password"
              name="password"
              className={active ? "active-input" : ""}
              disabled={!active}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            <div
              ref={refIcon}
              onClick={(e) => {
                if (refPasswords.current.type === "password") {
                  refPasswords.current.type = "text";
                  refIcon.current.classList.add("text-sea-blue");
                } else {
                  refPasswords.current.type = "password";
                  refIcon.current.classList.remove("text-sea-blue");
                }
              }}
              className="absolute right-0  bottom-0 h-[1.7rem] w-8 cursor-pointer grid place-items-center "
            >
              <FontAwesomeIcon icon="fa-solid fa-eye" />
            </div>
          </label>
        </div>
        {/*------------------------address------------------------ */}

        <label
          htmlFor="address"
          className={
            formik.touched.address && formik.errors.address ? "error" : ""
          }
        >
          {formik.touched.address && formik.errors.address
            ? formik.errors.address
            : "Address"}
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className={active ? "active-input" : ""}
          disabled={!active}
          value={formik.values.address}
          onChange={formik.handleChange}
        ></input>
        {/*------------------------email------------------------ */}

        <label
          htmlFor="email"
          className={formik.touched.email && formik.errors.email ? "error" : ""}
        >
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : "Email"}
        </label>
        <input
          placeholder="youremail@mail.com"
          type="text"
          id="email"
          name="email"
          className={active ? "active-input" : ""}
          disabled={!active}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></input>

        {/* ========================================================== */}
        <button
          type="submit"
          className={(" bg-green-400 self-end hover:bg-green-500 ") +(active ? "btn save active-btn" : "btn save")}
        >
          Save
        </button>
      </form>
      <div className="option-group flex flex-row gap-x-4 gap-y-2 lg:flex-col ">
        <button className="btn feedback">Feedback</button>
        <button
          // className="btn edit"
          className={active ? "btn edit warn" : "btn edit"}
          // onClick={resetForm}
          onClick={(e) => setEdit((prev) => !prev)}
        >
          {active ? "Cancel" : "Edit Profile"}
        </button>
        <button className="btn logout" onClick={logout}>
          Log-out
        </button>
      </div>
    </motion.div>
  );
}

export default Profile;
