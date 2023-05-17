import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

function Profile({ firstName, lastName, userAddress, userEmail, userPhone }) {
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      fname: firstName,
      lname: lastName,
      dob: "30/10/2077",
      address: userAddress,
      email: userEmail,
      phone: userPhone,
    },
    enableReinitialize: true,
    //validation
    validationSchema: Yup.object({
      name: Yup.string().max(30, "Name must be 30 characters or less"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .max(20, "Phone number must be 20 digits or less")
        .matches(phoneRegExp, "Phone number is not valid"),
    }),

    onSubmit: (values) => {
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
      className="user-info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="drop-img">drop img here</div>
      <form
        className="information-form"
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
      <div className="option-group">
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
