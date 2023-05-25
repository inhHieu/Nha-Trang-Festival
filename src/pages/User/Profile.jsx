import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import axios from "axios";
import { parse, isDate } from "date-fns";

import * as Yup from "yup";

function Profile({ userInfos }) {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [waiting, setWaiting] = useState(false);
  const [token, setToken] = useState();

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
      phone: userInfos.phone,
      sex: userInfos.sex,
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
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .max(20, "Phone number must be 20 digits or less")
        .matches(phoneRegExp, "Phone number is not valid"),
    }),

    onSubmit: async (values) => {
      setWaiting(true);
      try {
        const response = await axios.put(
          `http://localhost:8008/api/users/${id}`,
          JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: values.address,
            email: values.email,
            password: values.password,
            sex: values.sex,
            age: values.age,
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
        if (Number(response.data) && response.data == 1) {
          setStatus(true);
          setTimeout(() => {
            setStatus(false);
          }, 1000);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
      console.log(values);
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
    // setUserInfo([]);
    navigate("/");
  };

  return (
    <motion.div
      className="user-info flex flex-col w-full items-center lg:justify-around lg:items-start lg:flex-row "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="drop-img">drop img here</div>
      <form
        className="information-form w-full h-[25rem] flex flex-col lg:w-1/2 "
        method="post"
        onSubmit={formik.handleSubmit}
      >
        {/*------------------------fname------------------------ */}
        <label
          htmlFor="dname"
          className={formik.touched.fname && formik.errors.fname ? "error" : ""}
        >
          {formik.touched.fname && formik.errors.fname
            ? formik.errors.fname
            : "First Name"}
        </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className={active ? "active-input" : ""}
          disabled={!active}
          value={formik.values.fname}
          onChange={formik.handleChange}
        ></input>
        {/*------------------------lname------------------------ */}
        <label
          htmlFor="lname"
          className={formik.touched.lname && formik.errors.lname ? "error" : ""}
        >
          {formik.touched.lname && formik.errors.lname
            ? formik.errors.lname
            : "Last Name"}
        </label>
        <input
          type="text"
          id="lname"
          name="lname"
          className={active ? "active-input" : ""}
          disabled={!active}
          value={formik.values.lname}
          onChange={formik.handleChange}
        ></input>
        {/*------------------------dob------------------------ */}
        <label
          htmlFor="dob"
          className={formik.touched.dob && formik.errors.dob ? "error" : ""}
        >
          {formik.touched.dob && formik.errors.dob
            ? formik.errors.dob
            : "Day of Birth"}
        </label>
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

        {/*------------------------phone------------------------ */}
        <label
          htmlFor="phone"
          className={formik.touched.phone && formik.errors.phone ? "error" : ""}
        >
          {formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : "Phone"}
        </label>
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
        <button
          type="submit"
          className={active ? "btn save active-btn" : "btn save"}
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
