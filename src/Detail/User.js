import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./User.scss";
import bg from "../asses/art.jpg";

const User = (props) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const [userName, setUserName] = useState("");
  // const [userDOB, setUserDOB] =useState('')
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    setUserInfo(userInfo);
    setUserName(userInfo.fullName);
    // setUserDOB(userInfo);
    setUserAddress(userInfo.address);
    setUserEmail(userInfo.email);
    setUserPhone(userInfo.phone);
  }, [setUserInfo]);

  const formik = useFormik({
    initialValues: {
      name: userName,
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

  console.log(formik.values);
  console.log(userName);

  //edit user info
  const [active, setActive] = useState();
  const [edit, setEdit] = useState();
  useEffect(() => {
    if (edit) setActive(true);
    else setActive(false);
  }, [edit]);
  //edit user info--------------------
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log("submit", formData);
  }

  return (
    <motion.div
      className="user"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition= {{ bounce: 0 }} 
    >
      <div className="profile-display">
        <div className="bg-img-wrap">
          <img src={bg} alt="" />
        </div>
        <div className="info">
          <div className="avatar-wrap">
            <img src="" alt="" />
          </div>
          <div className="user-name">Shaun</div>
          <div className="tab-group">
            <div className="tab">Subscribed</div>
            <div className="tab active">Profile</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="user-info">
          <div className="drop-img">drop img here</div>
          <form
            className="information-form"
            method="post"
            onSubmit={formik.handleSubmit}
          >
            {/*------------------------name------------------------ */}
            <label
              htmlFor="name"
              className={
                formik.touched.name && formik.errors.name ? "error" : ""
              }
            >
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : "Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={active ? "active-input" : ""}
              disabled={!active}
              value={formik.values.name}
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
              className={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
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
              className={
                formik.touched.phone && formik.errors.phone ? "error" : ""
              }
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
            <button type="submit" className="btn save">
              Save
            </button>
          </form>
          <div className="option-group">
            <button className="btn feedback">Feedback</button>
            <button
              className="btn edit"
              onClick={(e) => setEdit((prev) => !prev)}
            >
              Edit Profile
            </button>
            <button className="btn logout">Log-out</button>
          </div>
        </div>
      </div>
    </motion.div>

    // <motion.div className="user"
    // initial={{y:100}}
    // animate={{y:0 , }}
    // transition={{ type: "spring", bounce: 0 }}
    // exit={{opacity:0}}>
    //   <div className="container">
    //     <h3 className="greeting">Hi,{userInfo.fullName}</h3>
    //       <div className="avatar">{/* <img></img> */}</div>

    //     </div>
    // </motion.div>
  );
};

export default User;
